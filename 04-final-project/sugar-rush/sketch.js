///arduino 
let port; 
let serialData;
let dir;
let resetBtn = 0;

//sound
var sfxGameStart;
var sfxGameOver;
var sfxScore;

//colours 
let pink = "#d73e7b";
let darkpink = "#9e1c50";
let peach = "#febe90";

//bg scroll
let lane1;
let lane2;

var scroll = 12;

//candy obstacles
let candySpawn = [];
let candyLane = [];
let spawnCounter = 0;
const SPAWN_RATE = 40;
const CANDY_SPEED = 12;

let holeSpawn = [];
let holeCounter = 0;
const HOLE_RATE = 400;
const HOLE_SPEED = 12;

//game
let score = 0;
let highScore = 0;
const HIGH_SCORE = 1;
let paused = false;
let isGameOver = false;
let isGameFinish = false;
let hasGameBegun = false;
const TIMER_SPEED = 0.75;


/*----------------- preload -----------------*/
function preload() {
  arcadeFont = loadFont("/font/KarmaticArcade.ttf");
  bodyFont = loadFont("/font/PressStart.ttf");

  sfxGameStart = loadSound("/assets/sfx-gamestart.mp3");
  sfxGameOver = loadSound("/assets/sfx-gameover.mp3");
  sfxScore = loadSound("/assets/sfx-score.mp3");

  bg = loadImage("/assets/background.jpg");
  carImage = loadImage("/assets/car.png");

  candy1 = loadImage("/assets/candy-pinkspiral.png");
  candy2 = loadImage("/assets/candy-pinkround.png");
  candy3 = loadImage("/assets/candy-greenswirl.png");
  candy4 = loadImage("/assets/candy-greensquare.png");

  candies = [candy1, candy2, candy3, candy4];

  sinkHole = loadImage("/assets/sinkhole-01.png");

  vanellopeIcon = loadImage("/assets/vanellope-icon.png");
  vanellopeFinishline = loadImage("/assets/vanellope-finishline.png");

  finishLine = loadImage("/assets/finish-line.png");
}

/*----------------- set up -----------------*/
function setup() {
  
  createCanvas(windowWidth, windowHeight);
  port = createSerial(); 

  if (sfxGameStart.isPlaying() === false) {
    sfxGameStart.play();
  }

  imageMode(CENTER);

  let savedHighScore = getItem("highScore");
  if (savedHighScore !== null) {
    highScore = int(savedHighScore);
  }

  lane1 = height/2;
  lane2 = -height/2;
  candyLane = [width * 0.35, width / 2, width * 0.65];

  car = new Car(width / 2, height - 200);
  timer = new Timer(width*0.04, height - height*0.18);
}

/*----------------- draw -----------------*/
function draw() {
  
  //bgscroll
  image(bg, width/2, lane1, width, height);
  image(bg, width/2, lane2, width, height);

  readSerialData();

  if (!paused) {
   lane1 += scroll;
   lane2 += scroll;

  if (lane1 >= height*1.5) lane1 = -height/2 + 10;
  if (lane2 >= height*1.5) lane2 = -height/2 + 10;

  //handle input
  handleInput();

  //obstacles
spawnCounter++;
if (spawnCounter >= SPAWN_RATE) {
    candySpawn.push(new Candy(random(candyLane), -50));
    spawnCounter = 0;
  }

  for (let i = candySpawn.length - 1; i >= 0; i--) {
    candySpawn[i].update();
    candySpawn[i].show();
    candySpawn[i].checkPassed(car);

    if (candySpawn[i].hits(car)) {
      candySpawn.splice(i, 1);
      score ++;
      sfxScore.play();
      continue;
    }
     if (candySpawn[i].y > height + 50) {
    candySpawn.splice(i, 1);
    }
  }

  holeCounter++;
  if (holeCounter >= HOLE_RATE) {
    holeSpawn.push(new Hole(random(candyLane), -300));
    holeCounter = 100;
  }

  for (let e = holeSpawn.length - 1; e >= 0; e--) {
    holeSpawn[e].update();
    holeSpawn[e].show();
    holeSpawn[e].checkPassed(car);

    if (holeSpawn[e].hits(car)) {
      gameOver();
    }
  }
  
  timer.update();
  car.update();
}

if (paused) {

for (let i = candySpawn.length - 1; i >= 0; i--) candySpawn[i].show();
for (let e = holeSpawn.length - 1; e >= 0; e--) holeSpawn[e].show();

timer.show();
car.show();

drawScore();

 if (isGameOver) {
  showGameOverScreen();
   if (resetBtn == 1) resetGame();
  } 

 if (isGameFinish) {
  showGameFinishScreen();
  if (resetBtn == 1) resetGame();
 }

 else if (hasGameBegun && resetBtn == 1) {
   resetGame();
 }

 return; // don't update game objects, but DO draw overlay

 
}

timer.show();
car.show();

drawScore();

}

/*----------------- handle input -----------------*/

function readSerialData() {
 if (port.opened()) {
   let serialData = port.readUntil("\n");
   if (serialData) {
     dir = Number(serialData[5]);
     resetBtn = Number(serialData[14]);
   }
   console.log(serialData);
 }
}

function handleInput() {
  if (keyCode === RIGHT_ARROW || dir == 0) {
    car.turnRight();
  }
  if (keyCode === LEFT_ARROW || dir == 1) {
    car.turnLeft();
  }
}

function keyPressed() {
 if ((isGameOver == true && key == "r") || (paused == true && resetBtn == 1)) {
   resetGame();
 } else if ((hasGameBegun == false && key == "r") || (paused == true && resetBtn == 1)) {
   hasGameBegun = true;
   loop();
 }
 console.log("press");
}


/*----------------- game reset -----------------*/

function drawScore() {
  textAlign(CENTER);
  textFont(arcadeFont);
  textSize(35);
  fill(255);
  text(score, width / 2, 80);

  if (score > highScore) {
      highScore = score;
      storeItem("highScore", highScore);
    }
}

function gameOver() {
  paused = true;
  isGameOver = true;
  sfxGameOver.play();
}

function showGameOverScreen() {

  fill(0, 0, 0, 150);
  rect(0, 0, width, height);

  textAlign(CENTER);
  textFont(arcadeFont);
  textSize(55);
  fill(255);
  text("GAME OVER!", width / 2, height / 2.5);

  textFont(bodyFont);
  textSize(16);
  text("High Score: " + highScore , width / 2, height / 2);

  textFont(bodyFont);
  textSize(16);
  text("Press GREEN BUTTON to play again.", width / 2, height / 1.5);

}

function gameFinish() {
  paused = true;
  isGameFinish = true;
  sfxGameStart.play();
}

function showGameFinishScreen() {

  fill(215, 62, 123, 150);
  rect(0, 0, width, height);

  textAlign(CENTER);
  textFont(arcadeFont);
  textSize(55);
  fill(255);
  text("RACE COMPLETE!", width / 2, height / 2.5);

  textFont(bodyFont);
  textSize(16);
  text("High Score: " + highScore , width / 2, height / 2);

  textFont(bodyFont);
  textSize(16);
  text("Press GREEN BUTTON to play again.", width / 2, height / 1.5);

}

function resetGame() {
  score = 0;
  isGameOver = false;
  isGameFinish = false;
  paused = false;
  hasGameBegun = true;

  car = new Car(width / 2, height - 200);
  candySpawn = [new Candy(random(candyLane), -50)];
  holeSpawn = []; // start empty or with initial hole
  timer = new Timer(width*0.04, height - height*0.18);

  loop();
}

// function highScore() {

//   highScores.push(newScore);
//   highScores.sort((a, b) => b.score - a.score);
//   highScores.sort((a, b) => b.score - a.score);
//   highScores.splice(HIGH_SCORES, highScore.length - 1);

//   newScore = highScore[0];
// }

/*----------------- classes -----------------*/
class Car {
  constructor(x, y, w, h) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.w = 195;
    this.h = 255;
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
    //rect(this.pos.x - 92, this.pos.y - 130, this.w, this.h);
    image(carImage, this.pos.x, this.pos.y);
    carImage.resize(260, 317);
  }
  update() {
    this.pos.add(this.vel);
    this.vel.mult(0.9);
    if (this.pos.x - 92 < 320 || this.pos.x - 92 + this.w > width - 320) {
      gameOver();
    }
  }
}

class Candy {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = 80;
    this.h = 80;
    this.speed = CANDY_SPEED;
    this.type = random(candies);

    this.top = this.y - 45;
    this.bottom = this.y - 45 + this.h;
    this.left = this.x - 35;
    this.right = this.x - 35 + this.w;

    this.passed = false;
  }
  update() {
    this.y += this.speed;
  }
  show() {
    //rect(this.x - 35, this.y - 45, this.w, this.h);
    image(this.type, this.x, this.y);
    candy1.resize(130, 120);
    candy2.resize(130, 120);
    candy3.resize(130, 120);
    candy4.resize(130, 120);
  }

  hits(car) {
    const overlapX = car.pos.x - 92 < this.x - 35 + this.w && car.pos.x - 92 + car.w > this.x - 35;
    const overlapY = car.pos.y - 130 < this.y - 45 + this.h && car.pos.y - 130 + car.h > this.y - 45;
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

class Timer {
  constructor (x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = 100;
    this.h = 100;
    this.speed = TIMER_SPEED;
    
    this.height = TIMER_SPEED;
    this.fixedy = y + 10;

    this.finishy = - 200;
    this.showFinishLine = false 
  }
  update() {
    this.y -= this.speed;
    this.height -= this.speed;

    if (this.y < height*0.18 + 50) {
      this.showFinishLine = true;
      this.finishy += 12;
    }

    if (this.y < height*0.18) {
      gameFinish();
    }
  }
  show() {
    //timerbar
    //ellipse(this.x, this.y, this.w);
    push();
    rectMode(CENTER);
    stroke(darkpink);
    strokeWeight(4);
    fill(peach);
    rect(width*0.04, height/2, 25, height/1.5, 20);
    pop();

    push();
    //timer run
    noStroke();
    fill(pink);
    rect(this.x - 12.5 + 1.5, this.fixedy, 22, this.height, 20);
    pop();

    image(vanellopeFinishline, this.x, this.fixedy - height/1.5 - 20);
    vanellopeFinishline.resize(100, 100);
    image(vanellopeIcon, this.x, this.y - 25, this.w, this.h);

    if (this.showFinishLine) {
      image(finishLine, width / 2, this.finishy, 1336 * 0.6, 187 * 0.6);
    }
  }
}

class Hole {
  constructor (x, y, w, h) {
    this.x = x; 
    this.y = y;
    this.w = 190;
    this.h = 110; 
    this.speed = HOLE_SPEED;
  }
  update() {
    this.y += this.speed;
  }
  show() {
    //rect(this.x - 100, this.y - 60, this.w, this.h);
    image(sinkHole, this.x, this.y, 423*0.65, 213*0.65);
  }

  hits(car) {
    const overlapX = car.pos.x - 92 < this.x - 100 + this.w && car.pos.x - 92 + car.w > this.x - 100;
    const overlapY = car.pos.y - 130 < this.y - 60 + this.h && car.pos.y - 130 + car.h > this.y - 60;
    return overlapX && overlapY;
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
    port.open(115200);
  } else {
    // Otherwise, close the port
    port.close();
  }
}

