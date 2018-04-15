class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 3;
        this.highlight = false;
    }

    move(p5) {
        this.x += p5.random(-1, 1);
        this.y += p5.random(-1, 1);
    }

    render(p5) {
        p5.noStroke();
        if (this.highlight) {
            p5.fill(255);
        } else {
            p5.fill(100);
        }

        p5.ellipse(this.x, this.y, this.r * 2);
    }

    intersects(p) {
        let d = dist(this.x, this.y, p.x, p.y);
        return (d < this.r + p.r);
    }

    setHighlight(value) {
        this.highlight = value;
    }
}