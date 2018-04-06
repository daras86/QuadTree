let qtree;

function setup() {
    createCanvas(800, 800);
    background(255);
    let boundry = new Rectangle(400, 400, 400, 400);
    qtree = new QuadTree(boundry, 4);
    for (let i = 0; i < 300; i++) {
        let x = randomGaussian(width / 2, width / 8);
        let y = randomGaussian(height / 2, height / 8);
        let p = new Point(x, y);
        qtree.insert(p);
    }

}

function draw() {

    if (mouseIsPressed) {
        let m = new Point(mouseX, mouseY);
        qtree.insert(m);
        console.log(qtree.getAllThePoints());
    }

    background(0);
    qtree.show(keyIsDown(UP_ARROW));
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
        let points = qtree.nearest(new Point(mouseX, mouseY));
        console.log("Total nearest points: ", points.length);
        for (let p of points) {
            console.log("Nearest point is: ", p);
            console.log("Sub trees visited: ", p.stepsToFind);
            stroke(255, 255, 0);
            strokeWeight(6);
            point(p.point.x, p.point.y);
        }
    //}
}
