// DM2008 – Activity 5a
// Colliding Circles (30 min)

let balls = [];
let stars = [];

function setup() {
  createCanvas(400, 400);

  // Step 1: create two Ball objects
  balls.push(new Ball(100, 200));
  balls.push(new Ball(200, 300));
  stars.push(new Star(100, 200));
  stars.push(new Star(200, 300));
  stars.push(new Star(50, 100));
  stars.push(new Star(80, 200));
  stars.push(new Star(200, 50));
}

function draw() {
  background("#ADDBEC");

  // Step 2: update and display each ball
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    b.move();
    b.show();

    b.checkCollision(balls);
  }
  for (let i = 0; i < stars.length; i++) {
    let s = stars[i];
    s.move();
    s.show();
    s.checkCollision(stars);
  }
}

class Ball {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.r = 30;
    this.vel = createVector(random(-10, 10), random(-10, 10));
  }
  move() {
    this.pos.add(this.vel);
    // TODO: wrap around OR bounce off edges
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
      // this.vel = this.vel * -1;
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }
  }

  show() {
    fill(100, 180, 220);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r * 2);
    ellipse(this.pos.x + 10, this.pos.y - 5, this.r);
  }
  checkCollision(others) {
    for (let i = 0; i < others.length; i++) {
      if (others[i] !== this) {
        let other = others[i];
        let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
        if (d < this.r + other.r) {
          push();
          stroke(200, 60, 60);
          strokeWeight(4);
          noFill();
          ellipse(this.pos.x, this.pos.y, this.r * 2); // highlight on collision
          pop();
        }
      }
    }
  }
}

class Star {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.r = 30;
    this.vel = createVector(random(2, 10), random(5, 8));

    this.rot = 0;
    this.npoint = 5;
    this.radius1 = 10;
    this.radius2 = 20;
  }
  move() {
    this.pos.add(this.vel);
    // TODO: wrap around OR bounce off edges
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
      // this.vel = this.vel * -1;
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }
  }

  show() {
    fill(100, 180, 220);
    noStroke();
    push();
    translate(this.pos.x, this.pos.y);
    fill("#BD9BF5");
    beginShape();
    let angle = TWO_PI / this.npoint;
    let halfAngle = angle / 2.0;
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = cos(a) * this.radius2;
      let sy = sin(a) * this.radius2;
      vertex(sx, sy);
      sx = cos(a + halfAngle) * this.radius1;
      sy = sin(a + halfAngle) * this.radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
    pop();
  }

  checkCollision(others) {
    for (let i = 0; i < others.length; i++) {
      if (others[i] !== this) {
        let other = others[i];
        let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
        if (d < this.radius1 + other.radius1) {
          push();
          translate(this.pos.x, this.pos.y);
          stroke(200, 60, 60);
          strokeWeight(4);
          noFill();
          beginShape();
          let angle = TWO_PI / this.npoint;
          let halfAngle = angle / 2.0;
          for (let a = 0; a < TWO_PI; a += angle) {
            let sx = cos(a) * this.radius2;
            let sy = sin(a) * this.radius2;
            vertex(sx, sy);
            sx = cos(a + halfAngle) * this.radius1;
            sy = sin(a + halfAngle) * this.radius1;
            vertex(sx, sy);
          }
          endShape(CLOSE);
          pop();
        }
      }
    }
  }
}

// Step 4: Add a method to checkCollision(others)
// Use dist() and respond visually
