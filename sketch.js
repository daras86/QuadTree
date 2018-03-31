let qtree;

function setup() {
    createCanvas(400, 400);
    let boundry = new Rectangle(200, 200, 200, 200);
    qtree = new QuadTree(boundry, 4);
    console.log(qtree);
}

function draw() {
    console.log("draw");
    if (mouseIsPressed) {
        let m = new Point(mouseX, mouseY);
        qtree.insert(m);
    }

    background(0);
    qtree.show();
}
