//add global variables for some values
let sketchPad = document.getElementById("sketch-pad");
let gridSize;
createGrid();
//make a function to select the grid size of the function
let gridSlider = document.querySelector("#grid-size-selector");
gridSlider.addEventListener("input", (event) => {
  cleanSketchPad();
  gridSize = event.target.value;
  createGrid(gridSize);
});

//Make a function to create a sketchpad
function createGrid(gridSize) {
  if (!gridSize) gridSize = 16;
  for (let num = 0; num < gridSize * gridSize; num++) {
    let pixel = document.createElement("div");
    pixel.setAttribute("class", "pixel");
    sketchPad.appendChild(pixel);
  }
  //console.log(gridSize);
}

//make a function to clear the sketchpad
function cleanSketchPad() {
  sketchPad.removeChild(sketchPad.lastChild);
}
