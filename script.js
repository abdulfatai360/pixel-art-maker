/*
  TODO: Add Functionality for Toggling Menu and Toolbar Display
  ----------------------------------------------------------------
*/
const MENU_ICON = document.querySelector('.menu-item');
const TOOLBAR_CONT = document.querySelector('.toolbar-container');
const APP_TITLE = document.querySelector('.app-title');

MENU_ICON.addEventListener('click', function() {
  const HEADER = document.querySelector('header');
  HEADER.classList.toggle('close-menu-toolbar');
});

/*
  TODO: Implement "makeGrid" Functionality
  ---------------------------------------------------------
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

  INPUT_HEIGHT.value = INPUT_HEIGHT.max;
  INPUT_WIDTH.value = INPUT_WIDTH.max;
}

//  TODO: Add Event Listener to a Button to Create the Design Canvas
const CANVAS_CREATOR = document.querySelector('input[type=button]');
CANVAS_CREATOR.addEventListener('click', makeGrid, false);