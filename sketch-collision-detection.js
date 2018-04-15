var collisonsSketch = function (p5) {
    p5.particles = [];
    p5.boundry;
    p5.setup = function setup() {
        let width = 800;
        let heigth = 800;
        p5.boundry = new Rectangle(400, 400, 400, 400);
        p5.createCanvas(width, heigth);
        p5.background(0);
        for (let i = 0; i < 2000; i++) {
            p5.particles[i] = new Particle(p5.random(width), p5.random(heigth));
        }
    }

    p5.draw = function draw() {
        p5.background(0);

        let qt = new QuadTree(p5.boundry, 4);
        for (let p of p5.particles) {
            p.move(p5);
            p.render(p5);
            p.setHighlight(false);
            qt.insert(new Point(p.x, p.y, p));
        }

        for (let p of p5.particles) {
            let circle = new Circle(p.x, p.y, p.r * 2);
            let points = qt.query(circle);
            for (let point of points) {
                let other = point.userData;
                if (other !== p) {
                    other.setHighlight(true);
                }
            }

            //Naive way
            // for (let other of particles) {
            //     if (other !== p && p.intersects(other)) {
            //         other.setHighlight(true);
            //     }
            // }
        }


        document.getElementById('framerate').innerHTML = 'Frame Rate: ' + p5.frameRate();
    }
}


