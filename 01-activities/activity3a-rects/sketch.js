// DM2008 — Activity 3a
// (Array Sampler, 25 min)

// 1. Create an array of colors (or other values)
//    You can make more than one array if you'd like
let palette = [
  "#3c78d8",
  "#009988",
  "#8ACFC7",
  "#AF95F0",
  "#7066E0",
  "#4D1FA9",
  "#A02CC6",
  "#E89EE5",
];
let circleWidth = 20;
let circleLength = 20;

// 2. A variable to track the current index
let currentIndex = 0;

function setup() {
  createCanvas(400, 400);
  noStroke();
}

function draw() {
  background(255, 213, 97);

  const spacing = width / (palette.length + 1);
  for (let i = 1; i < palette.length; i++) {
    const spacing = width / (palette.length + 1);
    // Draw one circle for each palette color
    for (let i = 0; i < palette.length; i++) {
      fill(palette[i]);
      const x = (i + 1) * spacing;
      rect(x, height / 2, circleWidth, circleLength);
    }
  }

  // 3. Use the array value at currentIndex
  //fill(palette[currentIndex]);
  //ellipse(width/2, height/2, 200);
}

// 4. Change the index when a key is pressed
function mousePressed() {
  // Code to run that uses the event.
  console.log();
  circleWidth += 2;
  // Advance to the next item
  currentIndex++;
  // Reset to 0 when we reach the end
  if (currentIndex >= palette.length) {
    currentIndex = 0;
  }
  // Log in the console to check
  console.log("Current index:", currentIndex, "→", palette[currentIndex]);
}

function mouseMoved() {
  if (mouseX < 200) {
    //palette[i] = palette[random]
    circleWidth -= 1;
  }

  if (mouseX > 200) {
    circleWidth++;
  }
}

function keyPressed() {
  if (key == "a" || key == "A") {
    // Add a new random color to the end
    let picked = random(palette);
    palette.push(color(picked));
  }
  if (key == "r" || key == "R") {
    // Remove the last color (if any)
    if (palette.length > 0) {
      palette.splice(palette.length - 1, 1);
    }
  }
}

/* 
TODOs for students:
1. Replace colors with your own data (positions, text, sizes, etc).
2. Try mousePressed() instead of keyPressed().
3. Use push() to add new items, or splice() to remove them, then check how the sketch adapts.
4. Try looping through an array to visualize all the items within it instead of accessing one item at a time.
*/
