// DM2008 — Activity 2b
// (Pattern Making, 40 min)

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(240);

  // Horizontal row of shapes
  for (let i = 0; i < width; i += 50) {
    // Alternate colors using % (modulo)
    if (i % 100 == 0) {
      fill(0);   // black
    } else {
      fill(180); // gray
    }
    ellipse(i + 25, height/2, 40);

    // TODO: change ellipse to rect, triangle, or something else
    // TODO: try varying size instead of color
  }

  // TODO: add one interaction (mouse or key) to change the rule
  // Example: if (mouseIsPressed) { fill(255, 0, 0); }
}