$(function() {
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
        'alt-1',
        'alt-2',
        'alt-3',
        'alt-4'
    ];

    var currentAlternative;
    var currentQuestionElement;
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
            if(direction === 'up' || direction === 'down') {
                newFocus = 3;
            }
            if(direction === 'left' || direction === 'right') {
                newFocus = 2;
            }
        }
        if(currentAlternative === 2) {
            if(direction === 'up' || direction === 'down') {
                newFocus = 4;
            }
            if(direction === 'left' || direction === 'right') {
                newFocus = 1;
            }
        }
        if(currentAlternative === 3) {
            if(direction === 'up' || direction === 'down') {
                newFocus = 1;
            }
            if(direction === 'left' || direction === 'right') {
                newFocus = 4;
            }
        }
        if(currentAlternative === 4) {
            if(direction === 'up' || direction === 'down') {
                newFocus = 2;
            }
            if(direction === 'left' || direction === 'right') {
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
                rotationY: '-0.20',
                rotationX: '-0.20'
            });
        }
        if(newFocus === 2) {
            TweenLite.to($('.question'), 0.25, {
                rotationY: '0.20',
                rotationX: '-0.20'
            });
        }
        if(newFocus === 3) {
            TweenLite.to($('.question'), 0.25, {
                rotationY: '-0.20',
                rotationX: '0.20'
            });
        }
        if(newFocus === 4) {
            TweenLite.to($('.question'), 0.25, {
                rotationY: '0.20',
                rotationX: '0.20'
            });
        }
    };

    document.onkeydown = function(e) {
        var e = e || window.event;
        var keypress = e.keyCode || e.which;
        if(keypress === 82) {
            createQuestion(questions);
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
    }
});