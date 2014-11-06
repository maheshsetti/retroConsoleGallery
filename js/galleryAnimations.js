$(function() {
});


var intervall = undefined;
var spriteClass = '';

var generateAndAnimateCloud = function (callback, randomLeft) {
    var cloud = $('<div>').addClass('cloud');
    var newWidth = randomNumber(10, 376);
    var randomTranslate = randomNumber(0, 800);
    var randomOpacity = randomNumber(1,9)/10;
    cloud.css({width: newWidth, height: 116/376*newWidth});
    $('body').append(cloud);
    TweenLite.to(cloud, 0, {y: randomTranslate, opacity: randomOpacity, z: 0});
    TweenLite.to(cloud, 40, {x: window.innerWidth+newWidth, ease: Linear.easeNone, onComplete: function() {
        cloud.remove();
    }});

};

var startBackgroundAnimation = function() {
    //TweenLite.to($('.background-animation-cool'), 0, {'x': '0px'});
    //TweenLite.to($('.background-animation-cool'), 200, {'x': '+3820px', ease: Linear.easeNone, onComplete: startBackgroundAnimation});
};

var startForegroundAnimation = function() {
    setInterval(function() {
        console.log('hello');
        generateAndAnimateCloud();
    }, 4000);
};

var startRocketBounce = function() {
    TweenLite.to($('#jan-olav-big'), 1, {y: '-50px', ease: Sine.easeInOut, onComplete:
        function() {
            TweenLite.to($('#jan-olav-big'), 1, {y: '+50px', ease: Sine.easeInOut, onComplete: startRocketBounce});
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