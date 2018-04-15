var nearestPointSketch = function (p) {
    p.qtree;

    p.setup = function setup() {
        p.createCanvas(800, 800);
        p.background(100);
        let boundry = new Rectangle(400, 400, 400, 400);
        p.qtree = new QuadTree(boundry, 4);
        for (let i = 0; i < 300; i++) {
            let x = p.randomGaussian(p.width / 2, p.width / 8);
            let y = p.randomGaussian(p.height / 2, p.height / 8);
            let point = new Point(x, y);
            p.qtree.insert(point);
        }

    }

    p.draw = function draw() {

        if (p.mouseIsPressed) {
            let m = new Point(p.mouseX, p.mouseY);
            p.qtree.insert(m);
        }

        p.background(0);
        p.qtree.show(p, p.keyIsDown(p.UP_ARROW));
        // stroke(0, 255, 0);
        // rectMode(CENTER);
        // let range = new Rectangle(mouseX, mouseY, 25, 25);
        // rect(range.x, range.y, range.w * 2, range.h * 2);
        // let points = qtree.query(range);
        // for (let p of points) {
        //     strokeWeight(4);
        //     point(p.x, p.y);
        // }    

        //if (keyIsDown(UP_ARROW)) {
        let sourcePoint = new Point(p.mouseX, p.mouseY);
        console.log("Source point: ", sourcePoint);
        let points = p.qtree.nearest(sourcePoint);
        console.log("Nearest points: ");
        for (let np of points) {
            console.log(np);
            p.stroke(255, 255, 0);
            p.strokeWeight(6);
            p.point(np.point.x, np.point.y);
        }

        document.getElementById('framerate').innerHTML = 'Frame Rate: ' + p.frameRate();

        //}
    }
    
}

