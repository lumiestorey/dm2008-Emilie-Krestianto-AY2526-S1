// DDM2008 — Activity 2b
// (Pattern Making, 40 min)

let circleSize = 10;
let squareSize = 20;
let spacing = squareSize * 2;
let bgColor;
let circleColor;
let squareColour;

let position;

function setup() {
  createCanvas(400, 400);
  bgColor = color("#C7F4F9");
  circleColor = color("#2E4BA5");
  squareColor = color("#ffc587")
  rectMode(CENTER);
  
  textSize(10);
  textAlign(CENTER);
}

function draw() {
  background(bgColor);
  
  text('press key s for square', 200, 18);
  text('press key c for circle', 200, 387);

  // Horizontal row of shapes
  for (let i = 1; i < 10; i++) {
    for (let e = 1; e < 10; e++) {
   
    if ((i + e) % 2 == 0) {
      fill(circleColor);
      noStroke();
      ellipse(e * spacing, i * spacing, circleSize);
      // black
    } else {
      fill(squareColor); 
      rect(e * spacing, i * spacing, squareSize);
    }
  }
  }

  if (mouseX < width / 3) { // % is only for modula, so it looks for a remainder, / is normal division
    // mouse X needs to be inside draw, but function mouseMoved can be outside
    position = "left";
  } else if (mouseX < (2 * width) / 3) {
    position = "middle";
  } else {
    position = "right";
  }
  
//  if (mouseY < height / 2) {
//    circleColor = color ("#ffc587")
//  } else {
//    squareColor = color ("#2E4BA5");
//  }
}

function mouseMoved() {
  switch (position) {
    case "left":
      bgColor = color("#F8E9A1");
      break;
    case "middle":
      bgColor = color("#FF8A5B");
      break;
    case "right":
      bgColor = color("#0077B6");
      break;
    default:
      bgColor = color(220);
  } 
}

function keyPressed() {
  if (key === 'c') {
    circleSize += 2;
    squareSize -= 2;
    console.log("c was pressed")
  } else if (key === 's') {
    circleSize -= 2;
    squareSize += 2;
    console.log("s was pressed")
  }  
  console.log("key has been pressed")
}


// TODO: change ellipse to rect, triangle, or something else
// TODO: try varying size instead of color

// TODO: add one interaction (mouse or key) to change the rule
// Example: if (mouseIsPressed) { fill(255, 0, 0); }
