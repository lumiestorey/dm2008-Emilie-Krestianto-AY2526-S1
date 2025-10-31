let port; // do not remove or rename
let serialData;

//bg scroll
let lane1;
let lane2;

var scroll = 12;

//candy obstacles
let candySpawn = [];
let candyLane = [];
let spawnCounter = 0;
const SPAWN_RATE = 90;
const CANDY_SPEED = 12;

//game
let score = 0;
let isGameOver = false;
let hasGameBegun = false;

/*----------------- preload -----------------*/
function preload() {
  arcadeFont = loadFont("KarmaticArcade.ttf");
  bodyFont = loadFont("PressStart.ttf");

  bg = loadImage("/assets/background.jpg");
  carImage = loadImage("/assets/car.png");

  candy1 = loadImage("/assets/candy-pinkspiral.png");
  candy2 = loadImage("/assets/candy-pinkround.png");
  candy3 = loadImage("/assets/candy-greenswirl.png");
  candy4 = loadImage("/assets/candy-greensquare.png");

  candies = [candy1, candy2, candy3, candy4];
}

/*----------------- set up -----------------*/
function setup() {
  // Change this if you want a fixed size canvas
  createCanvas(windowWidth, windowHeight);
  port = createSerial(); // creates the Serial Port

  imageMode(CENTER);

  lane1 = bg.height / 2;
  lane2 = 0 - bg.height / 2;
  candyLane = [width * 0.35, width / 2, width * 0.65];
  candySpawn.push(new Candy(random(candyLane), -50));

  car = new Car(width / 2, height - 350);
}

/*----------------- draw -----------------*/
function draw() {
  background(220);

  //bgscroll
  image(bg, width / 2, lane1, width, bg.height);
  image(bg, width / 2, lane2, width, bg.height);

  lane1 += scroll;
  lane2 += scroll;

  if (lane1 >= height) {
    lane1 = lane2 - bg.height;
  }
  if (lane2 >= height) {
    lane2 = lane1 - bg.height;
  }

  //handle input
  handleInput();

  car.update();

  spawnCounter++;
  if (spawnCounter >= SPAWN_RATE) {
    candySpawn.push(new Candy(random(candyLane), -50));
    spawnCounter = 0;
  }

  car.show();

  for (let i = candySpawn.length - 1; i >= 0; i--) {
    candySpawn[i].update();
    candySpawn[i].show();
    candySpawn[i].checkPassed(car);

    if (candySpawn[i].hits(car)) {
       candySpawn.splice(i, 1);
      score ++;
      continue;
    }
     if (candySpawn[i].y > height + 50) {
    candySpawn.splice(i, 1);
    }
  }
  //draw score
  textAlign(CENTER);
  textFont(arcadeFont);
  textSize(35);
  fill(255);
  text(score, width / 2, 80);

  // Receive data from Arduino
  if (port.opened()) {
    serialData = port.readUntil("\n");
    // Only log and use data that has information, not empty signals
    if (serialData[0]) {
      console.log(serialData);
    }
  }
}

/*----------------- handle input -----------------*/
function handleInput() {
  if (keyCode === RIGHT_ARROW) {
    car.turnRight();
  }
  if (keyCode === LEFT_ARROW) {
    car.turnLeft();
  }
}
function keyPressed() {
  if (isGameOver == true && key == " ") {
    resetGame();
  } else if (hasGameBegun == false && key == " ") {
    hasGameBegun = true;
    loop();
  }
  console.log("press");
}

/*----------------- game reset -----------------*/
function gameOver() {
  noLoop();
  fill(0, 0, 0, 150);
  rect(0, 0, width, height);

  textAlign(CENTER);
  textFont(arcadeFont);
  textSize(35);
  fill(255);
  text("GAME OVER!", width / 2, height / 2.5);

  textFont(bodyFont);
  textSize(12);
  text("Press SPACE BAR to play again.", width / 2, height / 2);
}
function resetGame() {
  score = 0;
  isGameOver = false;

  car = new Car(width / 2, height - 350);
  candySpawn = [new Candy(random(candyLane), -50)];

  //button.style("opacity", 0);
  loop();
}

/*----------------- classes -----------------*/
class Car {
  constructor(x, y, w, h) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.w = 390;
    this.h = 510;
    this.leftTurn = -0.6;
    this.rightTurn = 0.6;
  }
  turnRight() {
    this.vel.x += this.rightTurn;
  }
  turnLeft() {
    this.vel.x += this.leftTurn;
  }
  show() {
    //rect(this.pos.x - 185, this.pos.y - 260, this.w, this.h);
    image(carImage, this.pos.x, this.pos.y);
  }
  update() {
    this.pos.add(this.vel);
    this.vel.mult(0.9);
    if (this.pos.x - 185 < 200 || this.pos.x + this.w > width -200) {
      gameOver();
    }
  }
}

class Candy {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = 160;
    this.h = 160;
    this.speed = CANDY_SPEED;
    this.type = random(candies);

    this.top = this.y - 90;
    this.bottom = this.y - 90 + this.h;
    this.left = this.x - 70;
    this.right = this.x -  70 + this.w;

    this.passed = false;
  }
  update() {
    this.y += this.speed;
  }
  show() {
    //rect(this.x - 70, this.y - 90, this.w, this.h);
    image(this.type, this.x, this.y);
  }

  hits(car) {
    const overlapX = car.pos.x - 180 < this.x - 70 + this.w && car.pos.x - 180 + car.w > this.x - 70;
    const overlapY = car.pos.y - 260 < this.y - 90 + this.h && car.pos.y - 260 + car.h > this.y - 90;
    return overlapX && overlapY;

//     const aboveCandy = car.pos.y + car.w > this.top;
//     const belowCandy = car.pos.y < this.bottom;
//     const leftCandy = car.pos.x < this.left;
//     const rightCandy = car.pos.x + car.w > this.right;

//     return withinX && (aboveCandy || belowCandy || leftCandy || rightCandy);
    
  }

  checkPassed(car) {
    if (this.passed == false) {
      if (
        car.pos.y > this.y + this.h ||
        car.pos.y + car.h < this.y ||
        car.pos.x > this.x + this.w ||
        car.pos.x + car.w < this.x
      ) {
        //score = score + 1;
        this.passed = true;
      }
    }
  }
}

// DO NOT REMOVE THIS FUNCTION
function connectBtnClicked() {
  // When button is clicked, check if serial port is already opened
  if (!port.opened()) {
    // If not already, open the port with baud rate 9600
    // Make sure baud rate here matches settings in Arduino
    port.open(9600);
  } else {
    // Otherwise, close the port
    port.close();
  }
}
