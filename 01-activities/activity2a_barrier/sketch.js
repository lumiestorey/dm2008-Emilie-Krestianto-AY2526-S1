// DDM2008 — Activity 2a
// (Mode Switch, 20 min)

let x = 0;        // ellipse x-position
let size = 50;    // ellipse size (you can change this in your if/else)
let bgColor;      // background color set by switch(key)
let spacing = 15;

function setup() {
  createCanvas(400, 400);
  bgColor = color(11, 39, 94);
  rectMode(CENTER);
}

function draw() {
  background(bgColor);

  // --- Movement (base behaviour) ---
  // The ellipse moves to the right each frame.
  // If you decide to control speed with an if/else below,
  // REMOVE or comment out this next line so you don't "double add" to x.
  x += 2;
  
  // Wrap around when it exits the right edge
  if (x > width + size / 2) {
    x = 0;
    
  }
  if (mouseIsPressed) {
    rect (x, height / 2, size)
    fill (148, 216, 247); 
  } else {
    //draw(circleGroup)
    for(let i = 0; i < height; i += spacing) {
    ellipse(width/2, i, 30);
    fill(247, 197, 59);
    ellipse(x, height / 2, size);
    fill(51, 99, 196);
  }
  }
  // --- Your if/else goes here (choose ONE behaviour rule) ---
  // Examples (uncomment ONE idea, or write your own):
  //
  // 1) Change colour on mouse press
  // if (mouseIsPressed) {
  //   fill(255, 0, 0);
  // } else {
  //   fill(0);
  // }
  //
  // 2) Change size on right half
  if (x > width / 2) {
    size = 80;
  } else {
    size = 50;
  }
  //
  // 3) Change speed using mouse position (THEN comment out x += 2; above)
  if (mouseX > width / 2) {
    x += 6; // faster on right
  } else {
    x += 1; // slower on left
  }
  //
  // Keep it simple: one clear rule that is easy to see on screen.

  // --- Draw the ellipse (after your if/else so changes apply this frame) ---
  // If you didn't set fill() in your rule above, it will be black.
  noStroke();

  // Stretch (optional, if you finish early):
  // - Draw a rect instead of an ellipse when mouseIsPressed.
}
function keyPressed() {
    saveCanvas("activity1b-image", "jpg");
}
