var space;

function floatySpace() {
    var colors = [
        "#FFFFFF"
    ];

    space = new CanvasSpace("canvas", "#252934").display();
    var form = new Form(space);

    // Elements
    var center = space.size.$divide(1.8);
    var count = window.innerWidth * 0.05; // num of pt to create
    if (count > 150) count = 150;
    var mouse = center.clone();
    var r = Math.min(space.size.x, space.size.y) * 1;
    
    var circleList = [];

    for (var i = 0; i < count; i++) {
        var circle = new Circle(Math.random() * Math.min(space.size.x), Math.random() * Math.min(space.size.y)).setRadius(1); // new point at random coords within screensize
        circleList.push(circle); // Adds point p to array pts
    }

    var myCircles = {
        animate: function (time, fs, context) {
            for (var i = 0; i < count; i++) {
                var current = circleList[i];

                // form.fill("#FFFFFF").stroke(false).circle(current); // To set all circle colour 
                form.circle(current);

                var xDist = Math.abs(mouse.x - current.x);
                var yDist = Math.abs(mouse.y - current.y);
                var rDist = Math.sqrt((xDist * xDist) + (yDist * yDist));

                if (rDist < 50) {                   
                    form.fill("#ffd15f").stroke(false).circle(current);
                    current.setRadius(3);

                } else {
                    form.fill("#FFFFFF").stroke(false).circle(current);
                    current.setRadius(1);
                }
            }
        },
        onMouseAction: function (type, x, y, evt) {
            if (type == "move") {
                mouse.set(x, y);
            }
        },
        onTouchAction: function (type, x, y, evt) {
            this.onMouseAction(type, x, y);
        }
    };

    space.add(myCircles)
    space.bindMouse();
    space.play();
}

floatySpace();

$(window).resize(function () {
    space.removeAll();
    $('canvas').remove();
    floatySpace();
});
