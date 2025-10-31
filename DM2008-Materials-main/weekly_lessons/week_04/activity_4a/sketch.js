// DM2008 – Activity 4a
// Bake a Cookie (30 min)

let cookie;

function setup() {
  createCanvas(400, 400);
  noStroke();

  // Step 3: make one cookie object
  // cookie = new Cookie("chocolate", 80, width/2, height/2);
}

function draw() {
  background(230);

  // Step 4: call the cookie’s show() method
  // cookie.show();
}

// Step 1: define the Cookie class
class Cookie {
  constructor(flavor, sz, x, y) {
    // set up required properties
    this.flavor = flavor;
  }

  // Step 2: display the cookie
  show() {
    if (this.flavor == "chocolate") {
      fill(196, 146, 96);
    } else {
      fill(220, 180, 120);
    }
    ellipse(this.x, this.y, this.sz);
  }
  
  // Steps 5 & 6: Implement additional methods here
}

// Step 5: add movement (keyboard arrows)
// function keyPressed() {}

// Step 6: add flavor randomizer (mouse click)
// function mousePressed() {}