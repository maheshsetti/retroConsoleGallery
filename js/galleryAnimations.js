$(function() {
});


var intervall = undefined;
var spriteClass = '';

var generateAndAnimateCloud = function (callback, randomLeft) {
};

var startBackgroundAnimation = function() {
};

var startForegroundAnimation = function() {
};

var startRocketBounce = function() {
    console.log('this runs');
    TweenLite.to($('#crashcool-big'), 1, {opacity: '0.8', ease: Sine.easeIn});
    TweenLite.to($('#kratos-big'), 1, {opacity: '0.8', ease: Sine.easeIn});
    TweenLite.to($('#main-menu'), 1, {opacity: '0.8', ease: Sine.easeIn});
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
    } else {
        TweenLite.to($('#crashcool-big'), 1, {opacity: '0.2', ease: Sine.easeIn});
        TweenLite.to($('#kratos-big'), 1, {opacity: '0.2', ease: Sine.easeIn});
    }
};

var clearLevelBackground = function() {
};