
// DM2008 — Mini Project
// FLAPPY BIRD (Starter Scaffold)

// Notes for students:
// 1) Add flap control in handleInput() (space / ↑ to jump)
// 2) Detect collisions between the bird and pipes → game over
// 3) Add scoring when you pass a pipe
// 4) (Stretch) Add start/pause/game-over states

/* ----------------- Globals ----------------- */
let bird;
let pipes = [];
let isGameOver = false;
let score = 0;
let hasGameBegun = false;

//background scroll
let x1 = 0;
let x2;

var scrollSpeed = 2;

let spawnCounter = 0; // simple timer
const SPAWN_RATE = 90; // ~ every 90 frames at 60fps ≈ 1.5s
const PIPE_SPEED = 2.5;
const PIPE_GAP = 140; // gap height (try 100–160)
const PIPE_W = 80;

let cats;
let currentCat = 0;

/* ----------------- Setup & Draw ----------------- */

function preload() {
  arcadeFont = loadFont("KarmaticArcade.ttf");
  bodyFont = loadFont("PressStart.ttf");

  //insert assets

  bg = loadImage("/assets/sky.png", COVER);

  rock1 = loadImage("/assets/space rock_01.png");
  rock2 = loadImage("/assets/space rock_02.png");

  // rock1Rotated = loadImage("/assets/space rock_01 - rotated.png");
  rock2Rotated = loadImage("/assets/space rock_02 - rotated.png");

  //cat1
  cat1 = [
    loadImage("/assets/cat 1_end.png"),
    loadImage("/assets/cat 1_start.png"),
  ];

  cat2 = [
    loadImage("/assets/cat 2_end.png"),
    loadImage("/assets/cat 2_start.png"),
  ];

  cat3 = [
    loadImage("/assets/cat 3_end.png"),
    loadImage("/assets/cat 3_start.png"),
  ];

  cat4 = [
    loadImage("/assets/cat 4_end.png"),
    loadImage("/assets/cat 4_start.png"),
  ];

  cat5 = [
    loadImage("/assets/cat 5_end.png"),
    loadImage("/assets/cat 5_start.png"),
  ];

  cat6 = [
    loadImage("/assets/cat-6-end.png"),
    loadImage("/assets/cat-6-start.png"),
  ]

  cat7 = [
    loadImage("/assets/cat-7-end.png"),
    loadImage("/assets/cat-7-start.png"),
  ]

  cat8 = [
    loadImage("/assets/cat-8-end.png"),
    loadImage("/assets/cat-8-start.png"),
  ]

  cat9 = [
    loadImage("/assets/cat-9-end.png"),
    loadImage("/assets/cat-9-start.png"),
  ]

  cat10 = [
    loadImage("/assets/cat-10-end.png"),
    loadImage("/assets/cat-10-start.png"),
  ]

  // cat2 = [cat2Fall, cat2Jump];

  cats = [cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8, cat9, cat10];

  // rock.resize(10, 0);
}

function setup() {
  createCanvas(480, 640);

  x2 = bg.width;

  noStroke();
  bird = new Bird(120, height / 2);
  // Start with one pipe so there’s something to see
  pipes.push(new Pipe(width + 40));
  imageMode(CENTER);
}

function draw() {
  //background infinite scroll
  background(18, 22, 28);

  image(bg, x1, height / 2, bg.width, height);
  image(bg, x2, height / 2, bg.width, height);

  x1 -= scrollSpeed;
  x2 -= scrollSpeed;

  if (x1 <= -bg.width) {
    x1 = bg.width;
  }
  if (x2 <= -bg.width) {
    x2 = bg.width;
  }

  // image(img,-frameCount,0);

  //   if (frameCount < img.width) {
  //     image(img,-frameCount,0);
  //   }

  // 1) read input (students: add flap control here)
  handleInput();

  // 2) update world
  bird.update();

  // spawn new pipes on a simple timer
  spawnCounter++;
  if (spawnCounter >= SPAWN_RATE) {
    pipes.push(new Pipe(width + 40));
    spawnCounter = 0;
  }

  // 3) draw bird last so it’s on top
  bird.show();

  // update + draw pipes
  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();
    pipes[i].show();
    pipes[i].checkPassed(bird);

    // TODO (students): collision check with bird
    // If collision → stop the game or reset (add a game state if you want)
    if (pipes[i].hits(bird)) {
      isGameOver = true;
      noLoop();
      gameOver();
    }

    // remove pipes that moved off screen
    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  //draw score
  textAlign(CENTER);
  textFont(arcadeFont);
  textSize(35);
  fill(255);
  text(score, width / 2, 80);
}

function gameOver() {
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

  //cat change menu
  image(cats[0][0], width / 2, 400);

  button = createButton("change kibby");
  button.size(130, 40);
  button.position(width / 2-65, 500); 
  button.style("background-color", "#a04c82");
  button.style('border-radius', "10px");
  button.style("color", "white");
  //button.style("font-family", bodyFont);
  button.style("font-size", "15px");
  //textFont(bodyFont);
  //textSize(12);
  //text("change kibby", width / 2, height / 2);
  
  button.mousePressed(() => {
    if (currentCat < cats.length - 1) {
      currentCat += 1;
      image(cats[currentCat][0], width / 2, 400);
    } else {
      currentCat = 0;
      image(cats[currentCat][0], width / 2, 400);
    }
    console.log("cuurrent", currentCat);
  });
}

/* ----------------- Input ----------------- */
function handleInput() {
  // TODO (students): make the bird flap on key press
  // Hints:
  // - In keyPressed(): call bird.flap();
  if (keyIsDown(32)) bird.flap(); // 32 = space
}

function keyPressed() {
  // (Student choice) Uncomment to flap on space or UP:
  // if (key === ' ') { bird.flap(); }
  // if (keyCode === UP_ARROW) { bird.flap(); }

  if (isGameOver == true && key == " ") {
    resetGame();
  } else if (hasGameBegun == false && key == " ") {
    hasGameBegun = true;
    loop();
  }
}

function resetGame() {
  score = 0;
  isGameOver = false;

  bird = new Bird(64, height / 2);
  pipes = [new Pipe()];
  //PIPE_GAP = random(PIPE_W, width - width/4);

  button.style("opacity", 0);
  loop();
}
/* ----------------- Classes ----------------- */
class Bird {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 16; // for collision + draw
    this.gravity = 0.45; // constant downward force
    this.flapStrength = -6.0; // negative = upward
  }

  applyForce(fy) {
    this.acc.y += fy;
  }

  flap() {
    // instant upward kick
    this.vel.y = this.flapStrength;
  }

  update() {
    // gravity
    this.applyForce(this.gravity);

    // integrate
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // keep inside canvas vertically (simple constraints)
    if (this.pos.y < this.r) {
      this.pos.y = this.r;
      this.vel.y = 0;
    }
    if (this.pos.y > height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y = 0;
      // TODO (students): treat touching the ground as game over
    }

    // console.log(this.vel.y)
  }

  show() {
    //     fill(255, 205, 80);
    //     circle(this.pos.x, this.pos.y, this.r * 2);
    //     // (Optional) add a small eye
    //     fill(40);
    //     circle(this.pos.x + 6, this.pos.y - 4, 4);

    //assets
    if (this.vel.y < 0) {
      image(cats[currentCat][1], this.pos.x, this.pos.y);
    } else {
      image(cats[currentCat][0], this.pos.x, this.pos.y);
    }
  }
}

class Pipe {
  constructor(x) {
    this.x = x;
    this.w = PIPE_W;
    this.speed = PIPE_SPEED;
    this.passed = false;

    // randomize gap position
    const margin = 40;
    const gapY = random(margin, height - margin - PIPE_GAP);

    this.top = gapY; // bottom of top pipe
    this.bottom = gapY + PIPE_GAP; // top of bottom pipe

    this.passed = false; // for scoring once per pipe
  }

  update() {
    this.x -= this.speed;
  }

  show() {
    //fill(120, 200, 160);

    //rect(this.x, 0, this.w, this.top); // top pipe
    image(rock2Rotated, this.x + 40, this.top - height / 2 + 100);

    // image(rock, this.x, 0, this.w, this.top);

    //rect(this.x, this.bottom, this.w, height - this.bottom); // bottom pipe
    image(rock1, this.x + 40, this.bottom + rock1.height / 2 - 20);
  }

  offscreen() {
    // look at MDN to understand what 'return' does
    // we will learn more about this in Week 6
    return this.x + this.w < 0;
  }
  // TODO (students): circle-rect collision (simple)
  // 1) Check if bird within pipe's x range.
  // 2) If yes, check if bird.y is outside the gap (above top OR below bottom).
  //    Then it’s a hit.
  //
  hits(bird) {
    const withinX =
      bird.pos.x + bird.r > this.x && bird.pos.x - bird.r < this.x + this.w;
    const aboveGap = bird.pos.y - bird.r < this.top;
    const belowGap = bird.pos.y + bird.r > this.bottom;
    return withinX && (aboveGap || belowGap);
  }

  checkPassed(bird) {
    if (this.passed == false) {
      if (bird.pos.x + bird.r > this.x + this.w) {
        score = score + 1;
        this.passed = true;
      }
    }

    // console.log(score);
  }
}

