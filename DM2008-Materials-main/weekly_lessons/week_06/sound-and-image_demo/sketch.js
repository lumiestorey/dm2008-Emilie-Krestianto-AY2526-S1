let img, img2, sound;

function preload() {
  // Load your own files here
  img = loadImage("assets/chat.png");
  img2 = loadImage("assets/notification.png");
  sound = loadSound("assets/notified.mp3");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER); // draw image from its center
}

function draw() {
  background(220);

  // Display image in the center
  image(img, width / 2, height / 2, 250, 250);

  if (mouseIsPressed) {
    image(img2, width / 4 * 3 , height / 4 , 75, 75);
  }
}

// Play sound when mouse is pressed
function mousePressed() {
  sound.play();
}
