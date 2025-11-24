let bgcolor, button, slider;
let backgroundColor = ["#bfafef", "#8ac2ed", "#92dddb", "#92e8b1"];
let chosenShape = "circle";

function setup() {
  createCanvas(400, 400);

  // button affects background color
  bgcolor = color(200);
  button = createButton("Change bgColor");
  button.mousePressed(changeColor);
  button.position(10, 10);

  button.addClass("bg-btn");
  //   button.style('font-size', '12px');
  //   button.style('padding', '12px 24px');
  //   button.style('border-radius', '50px');

  // slider affects circle size
  // createSlider(min, max, start, step);
  slider = createSlider(10, 400, 50, 10);
  slider.position(10, 50);

  sel = createSelect();
  sel.position(10, 80);
  sel.option("circle");
  sel.option("square");
  sel.option("star");
  sel.changed(changeShape);
}

function draw() {
  background(bgcolor);
  drawChosenShape();
}

function changeColor() {
  bgcolor = color(random(backgroundColor));
}

function changeShape() {
  chosenShape = sel.value();
}

function drawChosenShape() {
  if (chosenShape == "circle") {
    noStroke();
    fill(255);
    ellipse(200, 200, slider.value());
  } else if (chosenShape == "square") {
    rectMode(CENTER);
    noStroke();
    fill(255);
    rect(200, 200, slider.value());
  } else if (chosenShape == "star") {
    noStroke();
    fill(255);
    star(width/2, height/2, slider.value()/4, slider.value()/2, 5);
  }
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
  
}