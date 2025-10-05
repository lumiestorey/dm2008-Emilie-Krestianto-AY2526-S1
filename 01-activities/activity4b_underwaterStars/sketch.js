// DM2008 — Activity 4b
// Objects in Motion (60 min)

// ============================
// Step 0: Global data
// ============================
let agents = []; // array to hold many objects
let stars = [];
const NUM_START = 8; // you can tweak this

function setup() {
  createCanvas(600, 400);
  noStroke();

  // ============================
  // Step 1: Populate the array
  // - Use a loop to create multiple instances
  // - Give each instance some randomized starting values
  // ============================
  for (let i = 0; i < NUM_START; i++) {
    let x = random(width);
    let y = random(height);
    let sz = random(8, 25);
    let speedX = random(-1, 1);
    let speedY = random(-6, -2);
    // TODO: pass any extra properties you plan to use
    agents.push(new Agent(x, y, sz, speedX, speedY));
  }
}

function draw() {
  background("#c0e1f0");

  // ============================
  // Step 2: Loop through the array
  // - Call at least TWO methods on each object
  //   e.g., update() then show()
  // ============================
  for (let i = 0; i < agents.length; i++) {
    agents[i].update(); // change over time
    agents[i].show(); // draw
  }

  // ============================
  // Step 3 (optional but recommended):
  // Removal / lifespan
  // - If your objects can "die", remove them safely.
  // - Use a backward loop to avoid skipping items when splicing.
  // ============================
  for (let i = agents.length - 1; i >= 0; i--) {
    if (agents[i].life <= 0) {
      agents.splice(i, 1);
     }
   }
  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].showstar();
  }
    
  for (let i = stars.length - 1; i >= 0; i--) {
    if (stars[i].life <= 0) {
      stars.splice(i, 1);
    }
  }
}

// ============================
// Step 4: Interaction (optional)
// - Add new objects with mouse clicks
// - Toggle behaviors with keys
// ============================
function mousePressed() {
  let speedX = random(-1, 1);
  let speedY = random(-4, 4);
  let radius1 = 25;
  let radius2 = 60;
  let rot = random(0, 360);
  let npoints = 5;
  stars.push(new Star(mouseX, mouseY, radius1, radius2, speedX, speedY, rot, npoints));
}

function keyPressed() {
  // Example toggles—feel free to customize
  if (key === "C") {
    // clear all agents
    agents = [];
  }
}

// ============================
// Step 5: Define your Class
// - Must have at least 1 property that changes over time
// - Must have at least 1 method besides show()
// - Feel free to add more properties/methods
// ============================
class Agent {
  constructor(x, y, sz, speedX, speedY) {
    // Required properties
    this.x = x;
    this.y = y;
    this.sz = sz;

    // Motion
    this.dx = speedX;
    this.dy = speedY;

    // Style (customize!)
    this.r = random(90, 110);
    this.g = random(150, 220);
    this.b = random(180, 200);
    this.a = 200;

    // Lifespan (optional)
    this.life = 255; // use this if you want fade/shrink/remove behavior
  }

  // Method #1: update — change over time
  update() {
    // Basic movement
    this.x += this.dx;
    this.y += this.dy;

    // Simple screen wrap (A) or bounce (B) — pick one or implement your own:

    // (A) Wrap:
    if (this.x > width) {
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = width;
    }
    if (this.y > height) {
      this.y = 0;
    }
    if (this.y < 0) {
      this.y = height;
    }
    
    //this.radius1 -= 1;
    //this.radius2 -= 1;

    // (B) Bounce (comment Wrap out if you use Bounce):
    // if (this.x < 0 || this.x > width) {
    //   this.dx *= -1;
    // }
    // if (this.y < 0 || this.y > height) {
    //   this.dy *= -1;
    // }

    // Example of property changing over time:
    // subtle size pulse
    // this.sz += sin(frameCount * 0.05) * 0.2;

    // Or use a lifespan:
    // this.life -= 1;        // fade over time
    // this.sz -= 0.05;     // shrink slowly
  }

  // Method #2: show — draw the object
  show() {
    // If you use HSB, set colorMode(HSB) in setup()
    // colorMode(HSB, 360, 100, 100, 255);
    // fill(this.h, 70, 90, this.a);

    // Using RGB to keep it simple
    fill(this.r, this.g, this.b, this.a);
    ellipse(this.x, this.y, this.sz);
  }
}

class Star {
  constructor(x, y, radius1, radius2, speedX, speedY, rot, npoints) {
    // Required properties
    this.x = x;
    this.y = y;
    this.radius1 = radius1;
    this.radius2 = radius2;

    // Motion
    this.dx = speedX;
    this.dy = speedY;
    this.rot = rot;
    this.rotSpeed = random(-0.05, 0.05);

    //Sides
    this.npoints = npoints
    //this.halfAngle = angle / 2.0
    
    // Style (customize!)
    this.h = random(360);
    this.a = 200;

    // Lifespan (optional)
    this.life = 255; // use this if you want fade/shrink/remove behavior
  }
  // Method #1: update — change over time
  update() {
    // Basic movement
    this.x += this.dx;
    this.y += this.dy;
    this.rot += this.rotSpeed;
    
    if (this.x < 0 || this.x > width) {
      this.dx *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.dy *= -1;
    }
    this.radius1 -= 0.1; 
    this.radius2 -= 0.1; 
    this.life -= 1;    
  }
  showstar() {
  push();
    translate(this.x, this.y);
    rotate(this.rot);
    fill(50 + (this.h % 200), 120, 200, this.a);
    beginShape();
    let angle = TWO_PI / this.npoints;
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


/* ============================
   TODO ideas (pick at least one):
   - Add a second method besides show(), e.g., bounce(), shrink(), changeColor()
   - Make one property evolve over time (size, hue, alpha, speed)
   - Add a key or mouse interaction that changes *all* agents (loop over array)
   - Implement removal: shrink agents and splice them when too small
============================= */
