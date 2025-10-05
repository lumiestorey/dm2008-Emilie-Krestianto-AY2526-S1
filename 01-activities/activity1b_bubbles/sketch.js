// DM2008
// Activity 1b (Georg Nees)

let x;
let y = 800;
let w;
let a;
let b;
let c;
//let p;

function setup() {
  createCanvas(800, 800)
  background("#b5e4f5");
  
}

function draw() {
  x = random(width);
  w = random(10, 120);
  
  
  a = random(width);
  b = random(height);
  c = random(50, 300);
  
  
  // background(240,40);
  
  stroke(0);
  noStroke();
  fill(96, 173, 214, 128);
  circle(x, y, w);
  y -= 5;
  
  stroke(72, 161, 194);
  strokeWeight(3);
  noFill(0);
  circle(a, b, c);
  
}

function mousePressed(){
  
  //let p = color("#7740B7");
  //let randomAlpha = random(10, 255); 

  //stroke(0);
  //noStroke();
  //fill(p,randomAlpha);
  //rect(x, y, 200, w);
  
  seaTurtle(a, b);
}

function keyPressed() {
    saveCanvas("activity1b-image", "jpg");
}

function seaTurtle(a, b) {
  fill("#6CA355")
  noStroke()
  circle (a+200, b+130, 60)
  circle (a+140, b+170, 45)
  circle (a+140, b+250, 45)
  circle (a+260, b+170, 45)
  circle (a+260, b+250, 45)
 
  fill("#2F7D33")
  noStroke()
  ellipse (a+200, b+210, 145)
  
  fill("#000000")
  noStroke()
  circle(a+178, b+125, 7)
  circle(a+222, b+125, 7)
  
  stroke("#459348")
  strokeWeight(4)
  line (a+160, b+185, a+240, b+240)
  line (a+150, b+215, a+215, b+260)
  line (a+185, b+165, a+250, b+210)
  line (a+240, b+185, a+160, b+240)
  line (a+250, b+215, a+185, b+260)
  line (a+215, b+165, a+150, b+210)
}
