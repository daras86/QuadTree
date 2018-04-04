class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(p) {
        if (p.x <= this.x + this.w &&
            p.y <= this.y + this.h &&
            p.x >= this.x - this.w &&
            p.y >= this.y - this.h) {
            return true;
        }
    }

    intersects(range) {
        return !(range.x - range.w > this.x + this.w ||
            range.x + range.w < this.x - this.w ||
            range.y - range.h > this.y + this.h ||
            range.y + range.h < this.y - this.h);
    }
}

class QuadTree {
    constructor(boundry, n) {
        this.boundry = boundry;
        this.capacity = n;
        this.points = [];
        this.divided = false;
    }

    subdivide() {
        let x = this.boundry.x;
        let y = this.boundry.y;
        let w = this.boundry.w;
        let h = this.boundry.h;

        let ne = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
        this.northeast = new QuadTree(ne, this.capacity);
        let nw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
        this.northwest = new QuadTree(nw, this.capacity);
        let sw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
        this.southwest = new QuadTree(sw, this.capacity);
        let se = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
        this.southeast = new QuadTree(se, this.capacity);

        this.divided = true;
    }

    insert(point) {
        if (!this.boundry.contains(point)) {
            return false;
        }

        if (this.points.find(p => p['x'] === point.x && p['y'] === point.y)) {
            return false;
        }

        if (this.points.length < this.capacity) {

            console.log("A new point has been added: ", point);
            this.points.push(point);
            return true;
        } else {
            if (!this.divided) {
                this.subdivide();
            }

            if (this.northeast.insert(point)) {
                return true;
            }
            else if (this.northwest.insert(point)) {
                return true;
            }
            else if (this.southeast.insert(point)) {
                return true;
            }
            else if (this.southwest.insert(point)) {
                return true;
            }
        }
    }

    query(range, found) {
        if(!found){
            found = [];
        }

        if (!this.boundry.intersects(range)) {
            return found;
        } else {
            for (let p of this.points){
                if(range.contains(p)){
                    found.push(p);
                }
            }
        }

        if(this.divided){
            this.northwest.query(range, found);
            this.northeast.query(range, found);
            this.southeast.query(range, found);
            this.southwest.query(range, found);
        }

        return found;
    }

    show() {
        stroke(255);
        noFill();
        rectMode(CENTER);
        rect(this.boundry.x, this.boundry.y, this.boundry.w * 2, this.boundry.h * 2);
        if (this.divided) {
            this.northeast.show();
            this.northwest.show();
            this.southwest.show();
            this.southeast.show();
        }
        for (let p of this.points) {
            stroke(255, 0, 0);
            strokeWeight(3);
            point(p.x, p.y);
        }
    }
}