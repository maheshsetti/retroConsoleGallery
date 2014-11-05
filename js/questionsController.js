    $(function() {
    var score = 0;
    var level = 0;
    var question = {
        count: undefined,
        question : {}
    };
    var currentScreen = '';
    var lives = 4;
    var levelData = {};
    var usedQuestions = [];
    var gameTimer = undefined;
    var gameTimerPelletInterval = undefined;
    var gameTimerLevelStart = undefined;
    var gameTimerLevelTime = undefined;
    var audioPoint = new Audio('sounds/point.wav');
    var audioLostLife = new Audio('sounds/lostlife.wav');
    var audioFireball = new Audio('sounds/fireball.wav');
    var audioSelect = new Audio('sounds/select.wav');
    var audioTimeout = new Audio('sounds/timeout.wav');
    var audioPebble = new Audio('sounds/pebble.wav');
    var audioNextlevel = new Audio('sounds/nextlevel.wav');
    //var audioBonus = new Audio('sounds/bonus.wav');
    var audioVictory = new Audio('sounds/victory.wav');
    var audioBowserhit = new Audio('sounds/bowserhit.wav');
    var audioBowserQuit = new Audio('sounds/bowserquit.wav');
    var audioDpad = new Audio('sounds/dpad.wav');
    var song = new Audio('sounds/song.mp3');
    var audioGamestart = new Audio('sounds/gamestart.wav');
    var countdown = new Audio('sounds/countdown.wav');
    var song2 = new Audio('sounds/song2.mp3');
    var song3 = new Audio('sounds/song3.mp3');
    var song4 = new Audio('sounds/song4.mp3');


    var questionClasses = {
        'alt-1' : 0,
        'alt-2' : 1,
        'alt-3' : 2,
        'alt-4' : 3
    };

    var questionNumbered = [
        '.alt-1',
        '.alt-2',
        '.alt-3',
        '.alt-4'
    ];

    var currentAlternative; // integer
    var currentQuestionElement; // jquery element
    var updateLevel = function(_level) {
        level = _level;
        $('#level-number').text(level);
    };

    var animateBlobs = function(callback) {
        console.log('animating blobs');
        var offset = $('#menu-points-number-next').offset();
        var width = $('#menu-points-number-next').width();
        var height = $('#menu-points-number-next').height();
        TweenLite.to($('.pellet'), 1, {left: offset.left + (width/2), top: offset.top + 60, onComplete: function() {
         callback($('.pellet').length);
         $('.pellet').remove();
        }});
    };

    var toggleJanOlav = function(toggle) {
        if(!toggle) {
            console.log('toggle-jan-olav');
            TweenLite.to($('#jan-olav-big'), 1, {z: '50',x: -window.innerWidth/2,  ease: Linear.EaseNone, onComplete: function() {
                $('#jan-olav-big').hide();
            }});
        } else {
            TweenLite.to($('#jan-olav-big'), 0, {z: 0, x: 2000});
            $('#jan-olav-big').show();
            TweenLite.to($('#jan-olav-big'), 0.5, {x: '0', ease: Linear.EaseNone});
        }
    };
    // the callback is optional
    var toggleMenu = function(toggle, element, callback) {
        if(!toggle) {
            TweenLite.to(element, 1, {y: '-1000px', rotation: '-90', ease: Linear.EaseNone, onComplete: function() {
                    element.hide();
                    if(callback) {
                        callback();
                    }
                }});
        } else {
            element.show();
            TweenLite.to(element, 0, {rotation: '-90'});
            TweenLite.to(element, 1, {y: '0px', rotation: 0, ease: Bounce.easeOut, onComplete: callback});
        }
    };

    var toggleScoreBoard = function(toggle) {
        if(toggle) {
            TweenLite.to($('.scoreboard'), 1, {x: '0px', ease: Elastic.easeInOut});
        } else {
            TweenLite.to($('.scoreboard'), 1, {x: '-400px', ease: Elastic.easeInOut});
        }
    };
    var toggleTimer = function(toggle) {
        if(toggle) {
            TweenLite.to($('.time-counter'), 1, {y: '0px', ease: Elastic.easeInOut});
        } else {
            TweenLite.to($('.time-counter'), 1, {y: '80px', ease: Elastic.easeInOut, onComplete: function() {
                $('.pac-man').remove();
            }});
        }
    };

    var updateScore = function(_score) {
        score = _score;
        console.log('updateing score', _score, score);
        $('#score-number').text(score);
    };
    var updateLives = function(_lives) {
        lives = _lives;
        $('#lives-number').text(lives);
    };

    var evaluateAnswer = function () {
        var success = false;
        if(question.question.alternatives[currentAlternative-1].solution) {
            audioPoint.play();
            questionNumbered.forEach(function(value, key) {
                if(key !== (currentAlternative-1)) {
                    $(value).addClass('answer-unselected');
                } else {
                    $(value).addClass('correct-answer');

                }
            });
            updateScore(score+100);
        } else {
            audioLostLife.play();
            $(questionNumbered[currentAlternative-1]).addClass('false-answer');
            questionNumbered.forEach(function(value, key) {
                $(value).addClass('answer-unselected');
            });
            updateLives(lives-1);
        }

        TweenLite.to('.question', 0.25, {rotationY: '-90', opacity: 0, delay: 0.25, onComplete: function() {
            if(lives === 0) {
                gameController('endGame');
            } else {
                nextQuestion();
            }
        }});
    };
    var nextQuestion = function () {
        flushQuestion();
        if(question.count < 9) {
            question = {
                count: question.count + 1,
                question: levelData[level][question.count + 1]
            };
            createQuestion(question);
        } else {
            gameController('nextLevel');
        }
    };

    var flushQuestion = function () {
        $('.question-wrapper').remove();
    };

    var generatePacMan = function(pellets, callback) {
        var pelletSpaceHorisontal = (window.innerWidth-((pellets+1)*20)) / pellets;
        var skew = 0;
        for (var x = 1; x<=pellets; x++) {
            var pellet = $('<div>').addClass('pellet');
            TweenLite.to(pellet, 0, {left: skew + 'px'});
            $('.time-counter').append(pellet);
            skew = (20+pelletSpaceHorisontal)*x;
        }
        $('.time-counter').append($('<div>').addClass('pac-man'));
        callback(pelletSpaceHorisontal);
    }
    var startAnimation = function(pelletSpace) {
        gameTimerPelletInterval = setInterval(function() {
            gameTimerLevelTime = new Date().getTime();
            console.log('start time: ', gameTimerLevelTime);
            $('.pac-man').css('background-image', 'url(img/janolavlukket.png)');
            setTimeout(function() {
                $('.pac-man').css('background-image', 'url(img/janolavaapen.png)');
            }, 700);
            TweenLite.to($('.pac-man'), 0.96, {left: '+=' + (20+pelletSpace), onComplete: function() {
                audioPebble.play();
                $('.pellet').first().remove();
            }});
        }, 960);
    };

    var generateAndAnimatePellet = function(callback) {
        var top = randomNumber(0, window.innerHeight);
        var animateY = (window.innerHeight-320)-top;
        console.log(top, animateY);
        audioFireball.play();
        var pellet = $('<div>').addClass('fireball-small').css({'left': 0, 'top': top});
        $('body').append(pellet);

        TweenLite.to(pellet, 1, {
            y: animateY,
            left: window.innerWidth-529,
            onComplete: function() {
                audioBowserhit.play();
                $('#jan-olav-big').addClass('aapen');

                pellet.remove();
                setTimeout(function() {
                    $('#jan-olav-big').removeClass('aapen');
                    callback();
                },100);
            }
        });
    };

    var countDown = function () {
        var questionWrapper = $('<div>').addClass('question-wrapper');
        var questionContainer = $('<div>').addClass('question-container');
        var countDown1 = $('<h1>').addClass('count-down').text('3');
        var countDown2 = $('<h1>').addClass('count-down').text('2');
        var countDown3 = $('<h1>').addClass('count-down').text('1');
        var countDownGo = $('<h1>').addClass('count-down').text('Go!');
        questionWrapper.append(questionContainer);
        questionContainer.append(countDown1);
        $('body').append(questionWrapper);
        countdown.play();
        TweenLite.to(countDown1, 0.5, {z: '100', opacity: 1, delay: 0.5, onComplete: function() { countDown1.remove(); countdown.currentTime = 0; countdown.play(); questionContainer.append(countDown2); }});
        TweenLite.to(countDown2, 0.5, {z: '100', opacity: 1, delay: 1, onComplete: function() { countDown2.remove(); countdown.currentTime = 0; countdown.play(); questionContainer.append(countDown3); }});
        TweenLite.to(countDown3, 0.5, {z: '100', opacity: 1, delay: 1.5, onComplete: function() { countDown3.remove(); countdown.currentTime = 0; audioGamestart.play(); questionContainer.append(countDownGo); }});
        TweenLite.to(countDownGo, 0.5, {z: '100', opacity: 1, delay: 2, onComplete: function() { countDownGo.remove(); countdown.currentTime = 0;  gameController('loadLevel'); }});
    };

    var createQuestion = function() {
        $('.question-wrapper').remove();
        var questionWrapper = $('<div>').addClass('question-wrapper');
        var questionContainer = $('<div>').addClass('question-container');
        var questionHeader = $('<h1>').addClass('question-header').text(question.question.question);
        var questionC = $('<div>').addClass('question');

        // Create questions
        console.log(question);
        questionC.append(questionHeader);
        question.question.alternatives.forEach(function(_question, index) {
            var container = $('<div>')
                .addClass('alt-' + (index+1) + '')
                .addClass('alternative');
            if(_question.type == 'img') {
                container.append($('<img>').attr('src', 'questions/levels/' + _question.media + '.jpg'));
            }
            questionC.append(container);
        });


        var completeQuestion = questionWrapper.append(questionContainer.append(questionC));
        $('body').append(completeQuestion);
        currentQuestionElement = completeQuestion;
        setFocusAlternativeFromClass(1);
        shiftQuestionContainer(1);
        currentAlternative = 1;
    };

    var setFocusAlternativeFromClass = function (alternative) {
        currentQuestionElement.find('.selected').removeClass('selected');
        currentQuestionElement.find('.alt-' + alternative).addClass('selected');
    };

    var moveFocus = function(direction) {
        var newFocus = undefined;
        if(currentAlternative === 1) {
            if('down') {
                newFocus = 3;
            }
            if(direction === 'right') {
                newFocus = 2;
            }
        }
        if(currentAlternative === 2) {
            if(direction === 'down') {
                newFocus = 4;
            }
            if(direction === 'left') {
                newFocus = 1;
            }
        }
        if(currentAlternative === 3) {
            if(direction === 'up') {
                newFocus = 1;
            }
            if(direction === 'right') {
                newFocus = 4;
            }
        }
        if(currentAlternative === 4) {
            if(direction === 'up') {
                newFocus = 2;
            }
            if(direction === 'left') {
                newFocus = 3;
            }
        }
        if(newFocus) {
            audioDpad.play();
            setFocusAlternativeFromClass(newFocus);
            currentAlternative = newFocus;
            shiftQuestionContainer(newFocus);
        }
    };

    var shiftQuestionContainer = function(newFocus) {
        if(newFocus === 1) {
            TweenLite.to($('.question'), 0.25, {
                rotationY: '0',
                rotationX: '0'
            });
        }
    };

    var startTimer = function(amount, callback) {
        gameTimerLevelStart = new Date().getTime();
        console.log('start time: ', gameTimerLevelStart);
        gameTimer = setTimeout(function() {
            TweenLite.to('.question', 0.25, {rotationY: '-90', opacity: 0, delay: 0.25, onComplete: function() {
                callback();
            }});
        },amount);
    };

    var scoreLoop = function(newScore, callback) {
        if(score <= newScore) {
           setTimeout(function () {
                $('#menu-points-number-next').text(score);
                score = score + 10;
                scoreLoop(newScore, callback);
           }, 2);
        } else {
            callback();
        }
    };

    var gameController = function(screen) {
        currentScreen = screen;
        if(screen === 'startGame') {
            toggleJanOlav(false);
            toggleMenu(false, $('#main-menu'));
            updateLevel(0);
            updateScore(0);
            updateLives(4);
            gameController('countDown');
        }
        if(screen === 'countDown') {
            song2.pause();
            song3.pause();
            song.pause();
            toggleJanOlav(false);
            toggleMenu(false, $('#next-level-menu'), function() {
                clearLevelBackground();
                countDown();
                if(level<0) {
                    generateLevelBackground(-1);
                } else {
                    generateLevelBackground(level+1);
                }
            });
        }

        if(screen === 'loadLevel') {
            if(level < 0) {
                gameController('loadBonusLevel');
            } else {
                song2.play();
                level = level+1;
                question = {
                    count: 0,
                    question: levelData[level][0]
                };
                updateLevel(level);
                toggleScoreBoard(true);
                generatePacMan(30, function(pelletSpace) {
                    startAnimation(pelletSpace);
                    createQuestion(question.question);
                    toggleTimer(true);
                    startTimer(30000, function() {
                        song2.pause();
                        gameController('endGame');
                    });
                });
            }
        }

        if(screen === 'loadBonusLevel') {
            $('#level-number').text('Bonus level');
            $('#jan-olav-big').addClass('bowser');
            toggleJanOlav(true);
            toggleScoreBoard(true);
            generatePacMan(10, function(pelletSpace) {
                startAnimation(pelletSpace);
                toggleTimer(true);
                startTimer(10000, function() {
                    audioBowserQuit.play();
                    toggleJanOlav(false);
                    gameController('nextLevel');
                });
            });
        }

        if(screen === 'nextLevel') {
            song2.pause();
            song3.play();
            audioNextlevel.play();
            $('#jan-olav-big').removeClass('bowser');
            if(gameTimer) {
                clearTimeout(gameTimer);
            }
            if(gameTimerPelletInterval) {
                clearInterval(gameTimerPelletInterval);
            }

            toggleScoreBoard(false);
            console.log('bartfjes');
            $('#menu-points-number-next').text(score);
            if(level > 0) {
                $('#level-id').text('brett ' + level);
            } else {
                $('#level-id').text('bonus-banen!');
            }

            $('#next-level-button').hide();
            toggleMenu(true, $('#next-level-menu'), function() {
                animateBlobs(function() {
                    toggleTimer(false);
                    console.log('tid', gameTimerLevelTime, gameTimerLevelStart);
                    var timeLeftOfLevelInSeconds = (gameTimerLevelTime - gameTimerLevelStart) / 1000;
                    console.log(timeLeftOfLevelInSeconds);
                    if(timeLeftOfLevelInSeconds <= 25 && level > 0) {
                        var newScore = score + (Math.round(timeLeftOfLevelInSeconds)*100);

                        scoreLoop(newScore, function() {

                            $('#next-level-button').text('Bonus brett låst opp');
                            $('#next-level-button').show();

                            level = level * -1;
                        });
                    } else {
                        level = level *-1;
                        $('#next-level-button').text('Neste brett').show();
                    }
                });
            });
        }

        if(screen === 'endGame') {
            audioTimeout.play();
            $('#jan-olav-big').removeClass('bowser');
            toggleTimer(false);
            if(gameTimer) {
                clearTimeout(gameTimer);
            }
            if(gameTimerPelletInterval) {
                clearInterval(gameTimerPelletInterval);
            }
            toggleScoreBoard(false);

            $('#menu-points-number').text(score);

            toggleMenu(true, $('#game-over-menu'));
            toggleJanOlav(true);
        }
        if(screen === 'startMenu') {
            clearLevelBackground();

            toggleMenu(false, $('#game-over-menu'), function() {
                generateLevelBackground(0);
                toggleMenu(true, $('#main-menu'));
            });
        }
    };

    //+ Jonas Raoni Soares Silva
    //@ http://jsfromhell.com/array/shuffle [v1.0]
    var shuffle = function (o){ //v1.0
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

    var init = function (callback) {
        $.get('getLevel.php?level=1', function(data) {
            levelData[1] = shuffle(data);
            console.log('leveldata', data);
            $.get('getLevel.php?level=2', function(data) {
                levelData[2] = shuffle(data);
                console.log(levelData);
                $.get('getLevel.php?level=3', function(data) {
                    levelData[3] = shuffle(data);
                    console.log(levelData);
                    document.onkeydown = function(e) {
                            var e = e || window.event;
                            var keypress = e.keyCode || e.which;
                            console.log(keypress);
                            if(keypress === 65 || keypress === 83) {
                                if(currentScreen === 'loadBonusLevel') {
                                    generateAndAnimatePellet(function() {
                                        score = score+1;
                                        $('#score-number').text(score);
                                    });
                                }
                            }
                            if(keypress === 83) {

                            }
                            if(keypress === 38) {
                                moveFocus('up');
                            }
                            if(keypress === 39) {
                                //right
                                moveFocus('right');
                            }
                            if(keypress === 40) {
                                // down
                                moveFocus('down');
                            }
                            if(keypress === 37) {
                                // left
                                moveFocus('left');
                            }
                            if(keypress === 13) {
                                console.log(currentScreen);
                                if(currentScreen === 'startMenu') {
                                    audioSelect.play();
                                    song.pause();
                                    gameController('startGame');
                                }
                                if(currentScreen === 'endGame') {
                                    gameController('startMenu');
                                    audioSelect.play();
                                    song.currentTime = 0;
                                    song.play();
                                }
                                if(currentScreen === 'nextLevel') {
                                    gameController('countDown');
                                }
                                if(currentScreen === 'loadLevel') {
                                    evaluateAnswer();
                                }
                            }
                        }
                    callback();
                });
            });
        });
    };

    init(function() {
        song.play();
        song.loop = true;
        gameController('startMenu');
    });
});