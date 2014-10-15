$(function() {
    console.log('bla');
    var leftMenu = $('.left-menu');
    $('.hamburger').on('click', function() {
        console.log('bla');
        toggleMenu();
    });
    TweenLite.to(leftMenu, 0, {
        left: '-340',
        rotationY: 150,
        ease:Power4.easeIn
    });


    var toggleMenu = function() {
        console.log(leftMenu.css('left'));
        if(parseInt(leftMenu.css('left'),10) < 0) {
            console.log('animerer ut');
            TweenLite.to(leftMenu, 0.4, {
                left: '0',
                rotationY: 0,
                ease:Power4.easeOut
            });
        } else {
            console.log('animerer inn');
            TweenLite.to(leftMenu, 0.2, {
                left: '-320',
                rotationY: 150,
                ease:Linear.easeNone
            });
        }
    };

    document.onkeydown = function(e) {
        var e = e || window.event;
        var keypress = e.keyCode || e.which;
        switch(keypress) {
            case 38:
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
            case 40: console.log('down'); moveBackground('down'); break;
            case 39: console.log('right'); moveBackground('right'); break;
        }
    }
});

