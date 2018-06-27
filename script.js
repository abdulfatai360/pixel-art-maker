/*
  TODO: Add Functionality for Toggling Menu and Toolbar Display
  ----------------------------------------------------------------
*/
const MENU_ICON = document.querySelector('.menu-item');
// const TOOLBAR_CONT = document.querySelector('.toolbar-container');
// const APP_TITLE = document.querySelector('.app-title');

MENU_ICON.addEventListener('click', function() {
  const HEADER = document.querySelector('header');
  HEADER.classList.toggle('close-menu-toolbar');
});

/*
  TODO: Implement "makeGrid()" to Dynamically Create Canvas Grids
  -----------------------------------------------------------------
*/
function makeGrid() {
  const INPUT_HEIGHT = document.querySelector('#inputHeight');
  const INPUT_WIDTH = document.querySelector('#inputWidth');
  const PIXEL_CANVAS = document.querySelector('#pixelCanvas');

  while (PIXEL_CANVAS.firstChild) {
    PIXEL_CANVAS.removeChild(PIXEL_CANVAS.firstChild);
  }

  let gridHeight = INPUT_HEIGHT.value;
  let gridWidth = INPUT_WIDTH.value;

  for (let i = 1; i <= gridHeight; i++) {
    const TR = document.createElement('tr');
    PIXEL_CANVAS.appendChild(TR);
    for (let j = 1; j <= gridWidth; j++) {
      const TD = document.createElement('td');
      TR.appendChild(TD);
    }
  }

  // Set the number fields value back to the allowable max value 
  INPUT_HEIGHT.value = INPUT_HEIGHT.max;
  INPUT_WIDTH.value = INPUT_WIDTH.max;
  activeColor();
}

//  TODO: Add Event Listener to a button to create the design canvas
const CANVAS_CREATOR = document.querySelector('input[type=button]');
CANVAS_CREATOR.addEventListener('click', makeGrid);

/*
  TODO: Implement Feature that Dynamically Paint Grid
  -------------------------------------------------------------------
*/
// NOTE: I use the "var" keyword here for Hoisting advantage
var color;
function activeColor() {
  const COLOR_PICKER = document.querySelector('#colorPicker');
  color = COLOR_PICKER.value;
  console.log('activeColor', color);
}

// TODO: Block-scoped the "COLOR_PICKER" variable. I use this technique
// in the code going forward to avoid littering the global context.
{
  const COLOR_PICKER = document.querySelector('#colorPicker');
  COLOR_PICKER.addEventListener('change', activeColor);
}

function paintGrid(event) {
  let activeGrid = event.target;
  if (activeGrid.nodeName === 'TD') {
    activeGrid.style.backgroundColor = color;
  }
}

// TODO: Add Event Listeners to grid using event delegation technique
{
  const PIXEL_CANVAS = document.querySelector('#pixelCanvas');
  PIXEL_CANVAS.addEventListener('click', paintGrid);
}

/*
  TODO: Implement Feature that Remove the Color on a Grid
  -------------------------------------------------------------
*/
function removeGridPaint() {
  let activeGrid = event.target;
  if (activeGrid.nodeName === 'TD') {
    activeGrid.style.backgroundColor = '';
  }
}

// TODO: Add Event Listeners to grid using event delegation technique
{
  const PIXEL_CANVAS = document.querySelector('#pixelCanvas');
  PIXEL_CANVAS.addEventListener('click', paintGrid);
}

/*
  TODO: Implement Feature that Removes all Colored Grids on the Canvas
  ---------------------------------------------------------------------
*/
function clearCanvas() {
  let wantToClear = window.confirm(
    '\nWARNING MESSAGE:\n' + 'Do you sure want to clear the Design Canvas?'
  );
  
  if (wantToClear) {
    const TDS = document.querySelectorAll('td');
    TDS.forEach(TD => {
      TD.style.backgroundColor = '';
    }); 
  } else {
    return;
  }
}