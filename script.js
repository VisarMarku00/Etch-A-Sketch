//add global variables for some values
let sketchPad = document.getElementById("sketch-pad");
let gridSize;
let brushColor;
let padBackGroundColor;
createGrid();

//make a function to select the grid size of the function
let selectorValue = document.querySelector("#value");
let gridSlider = document.querySelector("#grid-size-selector");
value.textContent = `${gridSlider.value} x ${gridSlider.value}`;
gridSlider.addEventListener("input", (event) => {
  cleanSketchPad();
  gridSize = event.target.value;
  value.textContent = `${gridSize} x ${gridSize}`;
  createGrid(gridSize);
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
      length:${heightPercentage}%;`
    );
    sketchPad.appendChild(pixel);
  }
}

//make a function to clear the sketchpad
function cleanSketchPad() {
  sketchPad.replaceChildren();
}
