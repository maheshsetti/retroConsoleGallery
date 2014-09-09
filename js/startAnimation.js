$(function() {
    var startAnimation = function() {
        TweenLite.to($('.nintendo'), 1.5, {transformPerspective:200, left:(window.innerWidth-300), rotation: 90, z: 50, ease:Linear.easeNone, onComplete: function() {
            TweenLite.to($('.nintendo'), 1.5, { top:(window.innerHeight-197), rotation: 180, z: -150, ease:Linear.easeNone, onComplete: function() {
                TweenLite.to($('.nintendo'), 1.5, { left:0, rotation: 270, z: 0, ease:Linear.easeNone, onComplete:function() {
                    TweenLite.to($('.nintendo'), 1.5, {  top:0, rotation:360, z: 150, ease:Linear.easeNone, onComplete:function() {
                        startAnimation();
                    }});
                }});
            }});
        }});
    };
    startAnimation();
});