// Select size input
const pixelCanvas = document.querySelector('#pixelCanvas');
const inputHeight = document.querySelector('#inputHeight');
const inputWidth = document.querySelector('#inputWidth');

// Select color input
const colorPicker = document.querySelector('#colorPicker');

/* 
_gridColorHandler function contains:
  1. _makeGridColor function, sets (and clears) the background color of the grid when clicked.
  2. _gridColorChange function, changes the background color of the grid after the colorPicker's value has changed.
*/
const _gridColorHandler = function () {
  let colorInput = colorPicker.value;

  function _gridColor(event) {
    let clickedGrid = event.target;
    if (clickedGrid.style.backgroundColor) {
      clickedGrid.style.backgroundColor = null;
    } else {
      clickedGrid.style.backgroundColor = colorInput;
    }
  }

  // Browser event delegation, leveraging on Event Bubbling
  pixelCanvas.addEventListener('click', _gridColor, false);

  function _gridColorChange() {
    colorInput = colorPicker.value;
  }

  colorPicker.addEventListener('change', _gridColorChange);
}();

// _gridColorHandler();

function _makeGrid(event) {
  event.preventDefault();
  const gridHeight = inputHeight.value;
  const gridWidth = inputWidth.value;

  while (pixelCanvas.hasChildNodes()) {
    pixelCanvas.removeChild(pixelCanvas.firstChild);
  }

  for (let i = 1; i <= gridHeight; i++) {
    const tr = document.createElement('tr');
    pixelCanvas.appendChild(tr);
    for (let j = 1; j <= gridWidth; j++) {
      const td = document.createElement('td');
      tr.appendChild(td);
    }
  }
}

// When size is submitted by the user, call makeGrid()
const gridHandler = document.querySelector('input[type=submit]');
gridHandler.addEventListener('click', _makeGrid, false);