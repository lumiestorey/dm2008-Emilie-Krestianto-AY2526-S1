// DM2008
// Activity 1b (Georg Nees)

let x;
let y;
let w;

function setup() {
  createCanvas(800, 800)
  background(240);
}

function draw() {
  
  x = random(width);
  y = random(height);
  w = random(10, 80);
  
  // background(240,40);
  
  stroke(0);
  strokeWeight(random(0.5, 2));
  noFill();
  rect(x, y, w, w);
}

function keyPressed() {
    saveCanvas("activity1b-image", "jpg");
}