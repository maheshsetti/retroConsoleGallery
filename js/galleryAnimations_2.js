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
        left: randomNumber(0, innerWidth),
        top: randomNumber(0, innerHeight),
        width: 40,
        height: 40
    })
    .addClass('star-' + randomStar + '  new-star');
    var tl = new TimelineMax({repeat:-1});
    tl.to(star, 10, {rotation: 360, repeat: -1, ease:Linear.easeNone});
    attachmentElement.append(star);
    animateOut(element);
    setTimeout(function() {
        element.removed;
    }, 2000);
};

var animateOut = function(element) {
    TweenLite.to(element, 2, {
        z: '+=' + tween,
        opacity: 0,
        ease:Power4.easeInOut,
        onComplete: removeShit,
        onCompleteParams: [elements]
    });
};

var removeShit = function(elements) {
    elements.remove();
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

document.onkeydown = function(e) {
    var e = e || window.event;
    var keypress = e.keyCode || e.which;
    switch(keypress) {
        case 38:
            setInterval(function() {
                console.log('generating stars');
                generateStar();
            }, 100);
            break;
        case 37: console.log('left');
            var stars = $('.new-star')
                .addClass('old-star')
                .removeClass('new-star');
            animateOut(stars);
            generateStars(40, 0, function() {
                animateIn('.new-star');
            });
        break;
        case 40: break;
        case 39: break;
    }
}

