$(function() {
});


var intervall = undefined;
var spriteClass = '';

var generateStars = function(amount, startDepth, callback) {
};

var startBackgroundAnimation = function() {
    TweenLite.to($('.background-animation-cool'), 0, {'x': '0px'});
    TweenLite.to($('.background-animation-cool'), 110, {'x': '+3820px', ease: Linear.easeNone, onComplete: startBackgroundAnimation});
};

var startForegroundAnimation = function() {
    TweenLite.to($('.foreground-animation-cool'), 0, {'x': '0px'});
    TweenLite.to($('.foreground-animation-cool'), 80, {'x': '+3820px', ease: Linear.easeNone, onComplete: startForegroundAnimation});
};

var startRocketBounce = function() {
    TweenLite.to($('#jan-olav-big'), 1, {y: '-50px', ease: Sine.easeOut, onComplete: 
        function() {
            TweenLite.to($('#jan-olav-big'), 1, {y: '+50px', ease: Sine.easeOut, onComplete: startRocketBounce});
        }
    });
};

var generateSprite = function(spriteClass) {
};

var animateOut = function(element) {
};

var randomNumber = function(min, max) {
    return Math.floor((Math.random() * max) + min);
};


var generateLevelBackground = function(level) {
    if(level === 0) {
        startBackgroundAnimation();
        startForegroundAnimation();
        startRocketBounce();
    }
};

var clearLevelBackground = function() {
};