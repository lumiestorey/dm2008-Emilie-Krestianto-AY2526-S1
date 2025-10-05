// DM2008 – Activity 4a
// Bake a Cookie (30 min)

let cookie;
let flavour = ["#67E2E7", "#CAA6FF","#FFBDD7"]

let cookieFlavour = 0;

function setup() {
  createCanvas(400, 400);
  noStroke();
  
  miffy = new Cookie(flavour[cookieFlavour], 80, width/2, height/2, 10);

  // Step 3: make one cookie object
  // cookie = new Cookie("chocolate", 80, width/2, height/2);
}

function draw() {
  background("#ADDBEC");
  
  miffy.show();

  // Step 4: call the cookie’s show() method
  // cookie.show();
}

// Step 1: define the Cookie class
class Cookie {
  constructor(flavor, sz, x, y, spd) {
    // set up required properties
    this.flavor = flavour[cookieFlavour];
    this.sz = sz;
    this.x = x;
    this.y = y;
    this.spd = spd;
  }

  // Step 2: display the cookie
  show() {
    if (this.flavor == flavour [cookieFlavour]) {
      fill(196, 146, 96);
    } else {
      fill(220, 180, 120);
    }
    
    ellipse(this.x + (this.x/20), this.y + (this.y/100), this.sz, this.sz/1.2);
    ellipse(this.x - (this.x/40), this.y - (this.x/8), this.sz/3, this.sz);
    ellipse(this.x + (this.x/8), this.y - (this.x/8), this.sz/3, this.sz);
    
    push();
    fill("#CAA6FF")
    ellipse(this.x + (this.x/40), this.y + (this.y/100), this.sz, this.sz/1.2);
    ellipse(this.x - (this.x/20), this.y - (this.y/8), this.sz/3, this.sz);
    ellipse(this.x + (this.x/10), this.y - (this.y/8), this.sz/3, this.sz);
    pop();
    
    ellipse(this.x, this.y, this.sz, this.sz/1.2);
    ellipse(this.x * 0.925, this.y * 0.875, this.sz/3, this.sz);
    ellipse(this.x * 1.075, this.y * 0.875, this.sz/3, this.sz);
    
    
    fill(60);
    ellipse(this.x - 20, this.y, this.sz/10);
    ellipse(this.x + 20, this.y, this.sz/10);
  
    push();
    noFill();
    stroke(60);
    strokeWeight(2);
    line(this.x * 0.975, this.y * 1.025, this.x * 1.025, this.y * 1.05);
    line(this.x * 1.025, this.y * 1.025, this.x * 0.975, this.y * 1.05);
    pop();
  }
  
  moveDown() {
    this.y += this.spd;
  }
  moveUp() {
    this.y -= this.spd
  }
  moveLeft() {
    this.x -= this.spd
  }
  moveRight() {
    this.x += this.spd
  }
  
  // Steps 5 & 6: Implement additional methods here
}

// Step 5: add movement (keyboard arrows)
function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    miffy.moveDown();
  }
  if (keyCode === UP_ARROW) {
    miffy.moveUp();
  }
  if (keyCode === LEFT_ARROW) {
    miffy.moveLeft();
  } 
  if (keyCode === RIGHT_ARROW) {
    miffy.moveRight();
  }
  console.log(keyPressed);
}

function mousePressed() {
  if (cookieFlavour >= flavour.length -1) {
    cookieFlavour = 0;
  } else {
    cookieFlavour += 1;
  }
  console.log(cookieFlavour);
}