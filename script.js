//add global variables for some values
let sketchPad = document.getElementById("sketch-pad");
let gridSize;
createGrid();

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
      height:${heightPercentage}%;`
    );
    sketchPad.appendChild(pixel);
  }
  //make a function to change pixel color on hover
  let pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => {
    pixel.addEventListener("mouseover", () => {
      pixel.style.backgroundColor = brushColor;
    });
  });
}

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


//make function to select background color and change it on pad
// let padBackgroundColorSelector = document.querySelector("#background-color");
// let padBackgroundColor = padBackgroundColorSelector.value;
// padBackgroundColorSelector.addEventListener("input", (event) => {
//   padBackgroundColor = event.target.value;
//   pixels.forEach((pixel) =>{
//     if(pixel.style.backgroundColor == padBackgroundColor){
//       pixel.style.backgroundColor = brushColor;
//     }
//   })
// });

//function comparePixelColors(backgroundColor) {}

//make a function for random colors on brush

//make a function for shading pixel

//make a function to lighten the pixel
