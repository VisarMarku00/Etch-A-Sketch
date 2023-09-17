//add global variables for some values
let sketchPad = document.getElementById("sketch-pad");
let gridSize = 16;
let padBackgroundColorSelector = document.querySelector("#background-color");
let padBackgroundColor = padBackgroundColorSelector.value;
let eraser = document.getElementById("eraser");
let rainbow = document.getElementById("rainbow-brush");
let shader = document.getElementById("shader");
let lighter = document.getElementById("lighter");
let lastButtonUsed;
let buttons = document.querySelectorAll(".change-sketch-pad");
createGrid();
const rgb2hex = (rgb) =>
  `#${rgb
    .match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
    .slice(1)
    .map((n) => parseInt(n, 10).toString(16).padStart(2, "0"))
    .join("")}`;

let buttonInUse = document.querySelector("button");

//make a function to select the grid size of the function
let selectorValue = document.querySelector("#value");
let gridSlider = document.querySelector("#grid-size-selector");
value.textContent = `${gridSlider.value} x ${gridSlider.value}`;
gridSlider.addEventListener("input", function allGridComponents(event) {
  cleanSketchPad();
  gridSize = event.target.value;
  value.textContent = `${gridSize} x ${gridSize}`;
  createGrid(gridSize);
});

//make function to clean sketch pad
let clear = document.getElementById("clear-pad");
clear.addEventListener("click", () => {
  cleanSketchPad();
  value.textContent = `${gridSize} x ${gridSize}`;
  createGrid(gridSize);
});

//make a function to clean previous grid size
function cleanSketchPad() {
  sketchPad.replaceChildren();
}

//make function to select brushColor
let brushColorSelector = document.querySelector("#brush-color");
let brushColor = brushColorSelector.value;
brushColorSelector.addEventListener("input", (event) => {
  brushColor = event.target.value;
});

//Make a function to create a sketchpad
function createGrid(gridSize) {
  if (!gridSize) gridSize = 16;

  const widthPercentage = 100 / gridSize;
  const heightPercentage = 100 / gridSize;

  for (let num = 0; num < gridSize * gridSize; num++) {
    let pixel = document.createElement("div");
    pixel.setAttribute("class", "pixel");
    pixel.setAttribute(
      "style",
      `width:${widthPercentage}%; 
      height:${heightPercentage}%;
      background-color: ${padBackgroundColor};`
    );
    sketchPad.appendChild(pixel);
  }

  //make a function to change pixel color on hover
  let pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => {
    pixel.addEventListener("mouseover", () => {
      if (buttonInUse.id == "rainbow-brush" && buttonInUse.value == "ON") {
        pixel.style.backgroundColor = generateColor();
      } else if (buttonInUse.id == "shader" && buttonInUse.value == "ON") {
        pixel.style.backgroundColor = ColorLuminance(
          rgb2hex(pixel.style.backgroundColor),
          -0.1
        );
      } else if (buttonInUse.id == "lighter" && buttonInUse.value == "ON") {
        pixel.style.backgroundColor = ColorLuminance(
          rgb2hex(pixel.style.backgroundColor),
          0.1
        );
      } else {
        pixel.style.backgroundColor = brushColor;
      }
    });
  });

  //make function to select background color and change it on pad
  padBackgroundColorSelector.addEventListener("input", (event) => {
    let previousBargroundColor = padBackgroundColor;
    padBackgroundColor = event.target.value;
    pixels.forEach((pixel) => {
      let hexPixel = rgb2hex(pixel.style.backgroundColor);
      if (hexPixel == previousBargroundColor) {
        pixel.style.backgroundColor = padBackgroundColor;
      }
    });
  });
}

buttons.forEach((currentButton) => {
  let prevColor = brushColorSelector.value;

  currentButton.addEventListener("click", () => {
    if (currentButton.id == "eraser") {
      if (currentButton.value == "OFF") {
        if (lastButtonUsed != null)
          turnOfOtherButtons(prevColor, lastButtonUsed);
        brushColor = padBackgroundColor;
        eraser.style.backgroundColor = "#cdc6c4";
        eraser.value = "ON";
        lastButtonUsed = currentButton;
      } else {
        eraser.value = "OFF";
        eraser.style.backgroundColor = "buttonface";
        brushColor = prevColor;
      }
    }
    if (currentButton.id == "rainbow-brush") {
      buttonAction(lastButtonUsed, currentButton, prevColor);
      buttonInUse = currentButton;
    }
    if (currentButton.id == "shader") {
      buttonAction(lastButtonUsed, currentButton, prevColor);
      buttonInUse = currentButton;
    }
    if (currentButton.id == "lighter") {
      buttonAction(lastButtonUsed, currentButton, prevColor);
      buttonInUse = currentButton;
    }
  });
});

function buttonAction(lastButtonUsed, currentButton, prevColor) {
  if (currentButton.value == "OFF") {
    if (lastButtonUsed != null) turnOfOtherButtons(prevColor, lastButtonUsed);
    brushColor = padBackgroundColor;
    currentButton.style.backgroundColor = "#cdc6c4";
    currentButton.value = "ON";
    lastButtonUsed = currentButton;
  } else {
    currentButton.value = "OFF";
    currentButton.style.backgroundColor = "buttonface";
    brushColor = prevColor;
  }
}

function turnOfOtherButtons(prevColor, lastButtonUsed) {
  let button = lastButtonUsed;
  button.value = "OFF";
  button.style.backgroundColor = "buttonface";
  brushColor = prevColor;
}

function ColorLuminance(hex, lum) {
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, "");
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  lum = lum || 0;

  // convert to decimal and change luminosity
  var rgb = "#",
    c,
    i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ("00" + c).substr(c.length);
  }

  return rgb;
}

function generateColor() {
  const hexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += hexArray[Math.floor(Math.random() * 16)];
  }
  return `#${code}`;
}
