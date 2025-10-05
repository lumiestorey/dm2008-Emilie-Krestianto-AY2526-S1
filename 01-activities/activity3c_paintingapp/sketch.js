// DM2008 — Activity 3b
// (Painting App, 50 min)

// 1) Palette + size
const palette = ["#f06449", "#009988", "#3c78d8", "#eeeeee"];
let colorIndex = 0;
let sizeVal = 20;

let clockwise = 0;
let anticlockwise = 0;
let lightColor = ["#67E2E7"];
let darkColor = ["#46A7C1"];
let purpleColor = ["#8E78E9"];
let lightPink = [" #FFBDD7"];
let darkPink = ["#DB729B"]

let selectedColor = 0;

// 2) Brush registry (array of functions)
const brushes = [brushFlower, brushHeart, brushFly, eraseBrush];
let currentBrush = 0; // 0, 1, or 2

function setup() {
  createCanvas(600, 600);
  background(240);
  rectMode(CENTER);
}

function draw() {
  // paint only while mouse is held
  if (mouseIsPressed) {
    const col = palette[colorIndex];
    // call the selected brush function
    brushes[currentBrush](mouseX, mouseY, col, sizeVal);
  }
}

// 3) Brush functions (students can customize/extend)
function brushFlower(x, y, c, s) {
  push();
  translate(x, y);
  rotate(radians(anticlockwise));
  backFlower(0, 0, s, s);
  pop();

  anticlockwise -= 1;

  push();
  translate(x, y);
  rotate(radians(clockwise));
  myFlower(0, 0, s, s);
  pop();

  clockwise += 1;
}

function brushHeart(x, y, c, s) {
  push();
  translate(x, y);
  noStroke();
  fill(c);
  heartShape(0, 0, s*2, s*2);
  pop();
}

function brushFly(x, y, c, s) {
  push();
  translate(x, y);
  noStroke();
  rotate(radians(90));
  butterFly(0, 0, s*2, s*2);
  pop();
}

function eraseBrush(x, y, c, s){
  noStroke();
  fill(240);
  ellipse(x, y, s, s);
}

// 4) Brush UI: select brush, cycle color, change size, clear
function keyPressed() {
  switch (key) {
    case '1':
      currentBrush = 0; // circle
      break;
    case '2':
      currentBrush = 1; // square
      break; 
    case '3':
      currentBrush = 2; // streak
      break;
    case 'e': 
      currentBrush = 3;
      break;
  }
  if (key == 'C' || key == 'c') {
    colorIndex = (colorIndex + 1) % palette.length; // cycle color
  }
  if (key == '+' || key == '=') {
    sizeVal += 4;
  }
  if (key == '-' || key == '_') {
    sizeVal = max(4, sizeVal - 4);
  } 
  if (key == 'X' || key == 'x') {
    background(240); // clear canvas
  } 
  // TODO: add an 'E' (eraser) mode by painting with background color
  // e.g., if eraserMode, use color(240) instead of palette[colorIndex]
}

function myFlower(x, y, w, h) {
  noStroke();

  fill(lightColor[selectedColor]);
  ellipse(x, y - h, w / 1.5, h * 1.5); //petal
  ellipse(x, y + h, w / 1.5, h * 1.5);
  ellipse(x - w, y, w * 1.5, h / 1.5);
  ellipse(x + w, y, w * 1.5, h / 1.5);

  push();
  translate(x, y);
  rotate(radians(45));
  ellipse(0, -h, w / 1.5, h * 1.5); //petal
  ellipse(0, h, w / 1.5, h * 1.5);
  ellipse(-w, 0, w * 1.5, h / 1.5);
  ellipse(w, 0, w * 1.5, h / 1.5);
  pop();

  fill("#F4DF69");
  ellipse(x, y, w, h); //center
}

function backFlower(a, b, c, d) {
  noStroke();

  fill(darkColor[selectedColor]);
  ellipse(a, b - d, c / 1.3, d * 2); //petal
  ellipse(a, b + d, c / 1.3, d * 2);
  ellipse(a - c, b, c * 2, d / 1.3);
  ellipse(a + c, b, c * 2, d / 1.3);

  push();
  translate(a, b);
  rotate(radians(45));
  ellipse(0, -d, c / 1.3, d * 2); //petal
  ellipse(0, d, c / 1.3, d * 2);
  ellipse(-c, 0, c * 2, d / 1.3);
  ellipse(c, 0, c * 2, d / 1.3);
  pop();
}

function heartShape(i, j, k, l){
  
  noStroke();
  fill(purpleColor);
  
  push();
  translate(i, j);
  rotate(radians(30));
  ellipse(i, j-(l/2.5), k/1.5, l);
  pop();
  
  push();
  translate(i, j);
  rotate(radians(-30));
  ellipse(i, j-(l/2.5), k/1.5, l);
  pop();
}

function butterFly(i, j, k, l){
  
  noStroke();
  fill(darkPink);
  
  push();
  translate(i, j);
  rotate(radians(35));
  ellipse(i, j-l/1.5, k/1.5, l);
  pop();
  
  push();
  translate(i, j);
  rotate(radians(-35));
  ellipse(i, j-l/1.5, k/1.5, l);
  pop();
  
  noStroke();
  fill(lightPink);
  
  push();
  translate(i, j);
  rotate(radians(215));
  ellipse(i, j-l/1.5, k/1.5, l);
  pop();
  
  push();
  translate(i, j);
  rotate(radians(145));
  ellipse(i, j-l/1.5, k/1.5, l);
  pop();
  
  fill("#F4DF69");
  ellipse(i, j, k, l/3);
}