 // DDM2008
// Activity 1a

// Run the sketch, then click on the preview to enable keyboard
// Use the 'Option' ('Alt' on Windows) key to view or hide the grid
// Use the 'Shift' key to change overlays between black & white
// Write the code for your creature in the space provided

let a = 75
let b = 85 
let c = 25
let d = 115
let B = -35
let D = 155

let a1 = a+80
let d1 = d+80
let D1 = D+80

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background("#b5e4f5");
  
  stroke ("#61C5D2")
  noFill()
  curve(a, b, a, c, d, c, d, b);
  curve(d, B, d, c, D, c, D, B )
  curve(a1, b, a1, c, d1, c, d1, b);
  curve(d1, B, d1, c, D1, c, D1, B);
  
  curve(a+130, b+300, a+130, c+300, d+130, c+300, d+130, b+300);
  curve(d+130, B+300, d+130, c+300, D+130, c+300, D+130, B+300 )
  curve(a1+130, b+300, a1+130, c+300, d1+130, c+300, d1+130, b+300);
  curve(d1+130, B+300, d1+130, c+300, D1+130, c+300, D1+130, B+300);
  
  curve(a-50, b+150, a-50, c+150, d-50, c+150, d-50, b+150);
  curve(d-50, B+150, d-50, c+150, D-50, c+150, D-50, B+150)
  curve(a1-50, b+150, a1-50, c+150, d1-50, c+150, d1-50, b+150);
  curve(d1-50, B+150, d1-50, c+150, D1-50, c+150, D1-50, B+150);
  
  fill("#6CA355")
  noStroke()
  circle (200, 130, 60)
  circle (140, 170, 45)
  circle (140, 250, 45)
  circle (260, 170, 45)
  circle (260, 250, 45)
 
  fill("#2F7D33")
  noStroke()
  ellipse (200, 210, 145)
  
  fill("#000000")
  noStroke()
  circle(178, 125, 7)
  circle(222, 125, 7)
  
  stroke("#459348")
  strokeWeight(4)
  line (160, 185, 240, 240)
  line (150, 215, 215, 260)
  line (185, 165, 250, 210)
  line (240, 185, 160, 240)
  line (250, 215, 185, 260)
  line (215, 165, 150, 210)
  
  helperGrid(); // do not edit or remove this line
}
