$(function() {
});


var intervall = undefined;
var spriteClass = '';

var generateStars = function(amount, startDepth, callback) {
    for(var i = 0; i < amount; i++) {
        generateStar($('body'));
    }
    callback();
};

var generateSprite = function(spriteClass) {
    var attachmentElement = $('.background-animation');
    var star = $('<div>');
    var innerWidth = window.innerWidth;
    var innerHeight = window.innerHeight;
    var randomStarSize = randomNumber(20, 100);
    var randomRotate = randomNumber(0, 40);
    var randomStar = randomNumber(1, 3);

    star
    .css({
        left: 0,
        top: randomNumber(0, innerHeight),
        opacity: 0
    })
    .addClass(spriteClass + '-' + randomStar);
    TweenLite.to(star, 0, {z: 0, x: -40});
    TweenLite.to(star, 10,
        {
            opacity: 1,
            x: innerWidth/2,
            z: 0,
            opacity: 0.4,
            ease:Linear.easeNone,
            onComplete: function() {
                TweenLite.to(star, 10,
                    {
                        opacity: 1,
                        x: '+=' + innerWidth/2,
                        z: 0,
                        opacity: 0,
                        ease:Linear.easeNone,
                        onComplete: function() {
                            star.remove();
                        }
                });
            }
    });
    attachmentElement.append(star);
    //animateOut(star);
};

var animateOut = function(element) {
    setTimeout(function() {
        element.remove();
    }, 20000);
};

var randomNumber = function(min, max) {
    return Math.floor((Math.random() * max) + min);
};


var generateLevelBackground = function(level) {
    spriteClass = '';
    if(level == 1) {
        spriteClass = 'star';
    }
    if(level == 0) {
        spriteClass = 'screen';
    }
    generateSprite(spriteClass);
    intervall = setInterval(function() {
        generateSprite(spriteClass);
    }, 2000);
}

var clearLevelBackground = function() {
    clearInterval(intervall);
    $('.' + spriteClass + '-1').remove();
    $('.' + spriteClass + '-2').remove();
    $('.' + spriteClass + '-3').remove();
};