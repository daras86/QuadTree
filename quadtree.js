class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class NearestPoint {
    constructor(point, distance, steps) {
        this.distance = distance;
        this.point = point;
        this.stepsToFind = steps;
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

    getAllThePoints(points) {
        if (!points) {
            points = [];
        }

        for (let p of this.points) {
            points.push(p);
        }

        if (this.divided) {
            this.northeast.getAllThePoints(points);
            this.northwest.getAllThePoints(points);
            this.southeast.getAllThePoints(points);
            this.southwest.getAllThePoints(points);
        }

        return points;
    }

    nearest(point, nearestPoints, checks) {
        if (!nearestPoints) {
            nearestPoints = [];
            checks = 0;
        }

        let minDistance = Number.MAX_VALUE;
        let range = this.boundry;
        if (nearestPoints.length > 0) {
            minDistance = nearestPoints[0].distance;
            range = new Rectangle(point.x, point.y, minDistance, minDistance);
        }

        if (!this.boundry.intersects(range)) {
            return nearestPoints;
        }

        checks = checks + 1;

        for (let p of this.points) {
            let d = this.distance(point, p);


            if (d < minDistance) {
                minDistance = d;
                nearestPoints.length = 0;
                nearestPoints.push(new NearestPoint(p, minDistance, checks));
            } else if (d == minDistance) {
                nearestPoints.push(new NearestPoint(p, minDistance, checks));
            }
        }

        if (this.divided) {
            this.northeast.nearest(point, nearestPoints, checks);
            this.northwest.nearest(point, nearestPoints, checks);
            this.southeast.nearest(point, nearestPoints, checks);
            this.southwest.nearest(point, nearestPoints, checks);
        }

        return nearestPoints;
    }

    distance(point1, point2) {
        return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
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
        if (!found) {
            found = [];
        }

        if (!this.boundry.intersects(range)) {
            return found;
        } else {
            for (let p of this.points) {
                if (range.contains(p)) {
                    found.push(p);
                }
            }
        }

        if (this.divided) {
            this.northwest.query(range, found);
            this.northeast.query(range, found);
            this.southeast.query(range, found);
            this.southwest.query(range, found);
        }

        return found;
    }

    show(showGrid) {
        if (showGrid) {
            stroke(255);
            noFill();
            rectMode(CENTER);
            strokeWeight(0.5);
            rect(this.boundry.x, this.boundry.y, this.boundry.w * 2, this.boundry.h * 2);
        }
        if (this.divided) {
            this.northeast.show(showGrid);
            this.northwest.show(showGrid);
            this.southwest.show(showGrid);
            this.southeast.show(showGrid);
        }
        for (let p of this.points) {
            stroke(255, 0, 0);
            strokeWeight(3);
            point(p.x, p.y);
        }
    }
}