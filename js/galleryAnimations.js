$(function() {
});

var moveBackground = function(direction) {
    switch(direction) {
        case 'right':
            TweenLite.to($('.front-glow'), 0.5, {
                left: '-=60%',
                ease:Power4.easeInOut
            });
            TweenLite.to($('.main-quiz-container'), 0.5, {
                left: '-=100%',
                ease:Power4.easeInOut
            });
            TweenLite.to($('.back-glow'), 0.5, {
                left: '-=30%',
                ease:Power4.easeInOut
            });
            break;

        case 'left':
            TweenLite.to($('.front-glow'), 0.5, {
                left: '+=60%',
                ease:Power4.easeInOut
            });
            TweenLite.to($('.main-quiz-container'), 0.5, {
                left: '+=100%',
                ease:Power4.easeInOut
            });
            TweenLite.to($('.back-glow'), 0.5, {
                left: '+=30%',
                ease:Power4.easeInOut
            });
            break;
    }
}


document.onkeydown = function(e) {
    var e = e || window.event;
    var keypress = e.keyCode || e.which;
    switch(keypress) {
        case 38: console.log('up'); moveBackground('up'); break;
        case 37: console.log('left'); moveBackground('left'); break;
        case 40: console.log('down'); moveBackground('down'); break;
        case 39: console.log('right'); moveBackground('right'); break;
    }
}

