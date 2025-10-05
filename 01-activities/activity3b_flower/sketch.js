let clockwise = 0;
let anticlockwise = 0;
let lightColor = ["#67E2E7", "#D0A9FA", "#FFBDD7"];
let darkColor = ["#46A7C1", "#8E78E9", "#DB729B"];

let selectedColor = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background("#D2F2B1");
  //radians function translate the human readable degree into radians which are esasier for the computer
  translate(mouseX - 200, mouseY - 200);
  blooFlower(0, 0);
}

function mousePressed() {
  if (selectedColor >= lightColor.length - 1) {
    selectedColor = 0;
  } else {
    selectedColor += 1;
  }
  
  console.log(selectedColor)
}

function blooFlower(e, f) {
  push();
  translate(width / 2, height / 2);
  rotate(radians(anticlockwise));
  backFlower(0, 0, 30, 30);
  pop();

  anticlockwise -= 1;

  push();
  translate(width / 2, height / 2);
  rotate(radians(clockwise));
  myFlower(0, 0, 30, 30);
  pop();

  clockwise += 1;
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

function keyPressed() {
  saveCanvas("activity3bs-image", "jpg");
}