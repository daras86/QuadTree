function setup() {
    createCanvas(400, 400);
}

let boundry = new Rectangle(200, 200, 200, 200);
let qt = new QuadTree(boundry, 4);
console.log(qt);


function draw() {
    if(mouseIsPressed){
        let m = new Point(mouseX, mouseY);
        qt.insert(m);
    }

    background(0);
    qt.show();
}
