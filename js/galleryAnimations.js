$(function() {
});

var generateStars = function(amount, startDepth, callback) {
    for(var i = 0; i < amount; i++) {
        generateStar($('body'));
    }
    callback();
};

var generateStar = function(attachmentElement) {

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
        width: 40,
        height: 40,
        opacity: 1
    })
    .addClass('star-' + randomStar + '  new-star');
    TweenLite.to(star, 10,
        {
            opacity: 1,
            x: innerWidth+40,
            z: 0,
            opacity: 1,
            ease:Linear.easeNone
    });
    attachmentElement.append(star);
    animateOut(star);
};

var animateOut = function(element) {
    setTimeout(function() {
        element.remove();
    }, 10000);
};

var removeShit = function(element) {
    element.remove();
}

var animateIn = function(elements) {
    var tween = 50;
    var randomOpacity = randomNumber(4, 10)/10;
    TweenLite.to(elements, 2, {
        opacity: randomOpacity,
        z: '+=10',
        ease:Power4.easeInOut
    });
}

var randomNumber = function(min, max) {
    return Math.floor((Math.random() * max) + min);
};

setInterval(function() {
    console.log('generating stars');
    generateStar($('.background-animation'));
}, 200);