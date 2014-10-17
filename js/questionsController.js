$(function() {
    var score = 0;
    var level = 0;
    var question = 0;
    var lives = 0;
    var usedQuestions = [];


    var questions = {
        question: 'Hvem er Mario?',
        alternatives : [
            {
                text: 'Mario',
                media: 'mario.jpg',
                type: 'img',
                solution: true
            },
            {
                text: 'Luigi',
                media: 'luigi.jpg',
                type: 'img',
                solution: false
            },
            {
                text: 'Samus',
                media: 'samus.jpg',
                type: 'img',
                solution: false
            },
            {
                text: 'Megaman',
                media: 'megaman.jpg',
                type: 'img',
                solution: false
            }
        ]
    };
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
    var evaluateAnswer = function () {
        var success = false;
        if(questions.alternatives[currentAlternative-1].solution) {
            questionNumbered.forEach(function(value, key) {
                if(key !== (currentAlternative-1)) {
                    $(value).addClass('answer-unselected');
                } else {
                    $(value).addClass('correct-answer');
                }
            });
        } else {
            $(questionNumbered[currentAlternative-1]).addClass('false-answer');
            questionNumbered.forEach(function(value, key) {
                $(value).addClass('answer-unselected');
            });
        }
        TweenLite.to('.question', 0.25, {rotationY: '-90', opacity: 0, delay: 0.25, onComplete: nextQuestion});
    };
    var nextQuestion = function () {
        flushQuestion();
        createQuestion(question);
    };

    var flushQuestion = function () {
        currentQuestionElement.remove();
    };

    var generatePacMan = function(callback) {
        var pelletSpaceHorisontal = (window.innerWidth-(30*20)) / 30;
        var usedSpaced = 0;
        console.log('pelletspacehorisontal', pelletSpaceHorisontal);
        for (var x = 0; x<60; x++) {
            if(x > 0) {
                usedSpaced = pelletSpaceHorisontal;
            }
            var pellet = $('<div>').addClass('pellet').css(
                {
                'left': (40*(x-1)) + usedSpaced + 'px'
                }
                );
            $('body').append(pellet);
        }
        $('body').append($('<div>').addClass('pac-man'));
        callback();
    }
    var startAnimation = function() {
        $('.pellet').each(function(index) {
            setTimeoutOnElement($(this), index);
        });
    };

    var setTimeoutOnElement = function (element, index) {
        var nextElement = $('.pellet')[index+1] || undefined;
        console.log(element);
        setTimeout(function() {
            console.log(element);
            element.remove();
            if(nextElement) {
                TweenLite.to($('.pac-man'), 1, {left: $(nextElement).css('left'), onComplete: function() {
                    console.log('bla');
                    $('.pac-man').addClass('aapen');
                    setTimeout(function() {
                        console.log('bla2');
                        $('.pac-man').removeClass('aapen');
                    }, 800);
                }});
            }
        },1900*(index));
    };

    var createQuestion = function(question) {
        var questionWrapper = $('<div>').addClass('question-wrapper');
        var questionContainer = $('<div>').addClass('question-container');
        var questionHeader = $('<h1>').addClass('questionHeader').text(question.question);
        var questionC = $('<div>').addClass('question');

        // Create questions
        questions.alternatives.forEach(function(question, index) {
            var container = $('<div>')
                .addClass('alt-' + (index+1) + '')
                .addClass('alternative');
            if(question.type == 'img') {
                container.append($('<img>').attr('src', 'questions/' + question.media));
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
            setFocusAlternativeFromClass(newFocus);
            currentAlternative = newFocus;
            shiftQuestionContainer(newFocus);
        }
    };

    var shiftQuestionContainer = function(newFocus) {
        if(newFocus === 1) {
            TweenLite.to($('.question'), 0.25, {
                rotationY: '-10',
                rotationX: '-10'
            });
        }
        if(newFocus === 2) {
            TweenLite.to($('.question'), 0.25, {
                rotationY: '10',
                rotationX: '-10'
            });
        }
        if(newFocus === 3) {
            TweenLite.to($('.question'), 0.25, {
                rotationY: '-10',
                rotationX: '10'
            });
        }
        if(newFocus === 4) {
            TweenLite.to($('.question'), 0.25, {
                rotationY: '10',
                rotationX: '10'
            });
        }
    };

    document.onkeydown = function(e) {
        var e = e || window.event;
        var keypress = e.keyCode || e.which;
        console.log(keypress);
        if(keypress === 82) {
            createQuestion(questions);
            generatePacMan(function() {
                startAnimation();
            });
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
            evaluateAnswer();
        }
    }
});