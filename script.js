/*
  TODO: Implement Feature that Toggles Menu and Toolbar Display
  --------------------------------------------------------------
*/
const MENU_ICON = document.querySelector('.menu-item');

MENU_ICON.addEventListener('click', function() {
  const HEADER = document.querySelector('header');
  HEADER.classList.toggle('close-menu-toolbar');
});

/*
  TODO: Implement Feature that Grabs and Stores Active Color Value
  -----------------------------------------------------------------
*/
let activeColor;

function colorToBeUsed() {
  const COLOR_PICKER = document.querySelector('#colorPicker');
  activeColor = COLOR_PICKER.value;
  console.log('activeColor', activeColor);
}

// TODO: Block-scoped the "COLOR_PICKER" variable. I use this technique
// in the code going forward to avoid littering the global context.
{
  const COLOR_PICKER = document.querySelector('#colorPicker');
  COLOR_PICKER.addEventListener('change', colorToBeUsed);
  COLOR_PICKER.addEventListener('mouseover', function () {
    COLOR_PICKER.parentNode.title = `Change Color (Active Color: ${(activeColor === undefined) ? '#000000' : activeColor})`;
  });
}

/*
  TODO: Implement Feature that Creates and Clears Canvas Grids
  -------------------------------------------------------------
*/
function makeGrid() {  
  const HEIGHT_FIELD = document.querySelector('#inputHeight');
  const WIDTH_FIELD = document.querySelector('#inputWidth');
  const PIXEL_CANVAS = document.querySelector('#pixelCanvas');

  while (PIXEL_CANVAS.firstChild) {
    PIXEL_CANVAS.removeChild(PIXEL_CANVAS.firstChild);
  }

  let inputHeight = HEIGHT_FIELD.value;
  let inputWidth = WIDTH_FIELD.value;

  for (let i = 1; i <= inputHeight; i++) {
    const TR = document.createElement('tr');
    PIXEL_CANVAS.appendChild(TR);

    for (let j = 1; j <= inputWidth; j++) {
      const TD = document.createElement('td');
      TR.appendChild(TD);
    }
  }

  // Set the number fields value back to the allowable max value
  HEIGHT_FIELD.value = HEIGHT_FIELD.max;
  WIDTH_FIELD.value = WIDTH_FIELD.max;

  colorToBeUsed();

  PIXEL_CANVAS.addEventListener('mouseover', function(event) {
    if (event.target.nodeName === 'TD') {
      event.target.classList.add('on-mode');
    }
  });

  PIXEL_CANVAS.addEventListener('mouseout', function (event) {
    if (event.target.nodeName === 'TD') {
      event.target.classList.remove('on-mode');
    }
  });
}

const WIDTH_FIELD = document.querySelector('#inputWidth');
WIDTH_FIELD.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    makeGrid();
  }
});

const CANVAS_CREATOR = document.querySelector('input[type=button]');
CANVAS_CREATOR.addEventListener('click', makeGrid);

/*
  TODO: Implement Feature that Dynamically Paint Grid
  ----------------------------------------------------
*/
const DESIGN_TOOLS = document.querySelectorAll('.tool');

function hiLiteActiveTool() {
  for (let i = 0; i < DESIGN_TOOLS.length; i++) {
    if (this === DESIGN_TOOLS[i]) {
      DESIGN_TOOLS[i].classList.add('activated');
    } else {
      DESIGN_TOOLS[i].classList.remove('activated');
    }
  }
}

function paintToolActivated() {
  const PIXEL_CANVAS = document.querySelector('#pixelCanvas');
  PIXEL_CANVAS.classList.remove('erase-mode', 'eye-dropper-mode');

  let boundHiLiteActiveTool = hiLiteActiveTool.bind(PAINT_TOOL);
  boundHiLiteActiveTool();

  function paintGrid(event) {
    let activeGrid = event.target;
    if (activeGrid.nodeName === 'TD' &&
      PAINT_TOOL.classList.contains('activated')) {
      activeGrid.style.backgroundColor = activeColor;
    }
  }

  PIXEL_CANVAS.classList.add('paint-mode');
  PIXEL_CANVAS.addEventListener('click', paintGrid);
}

const PAINT_TOOL = document.querySelector('.paint-tool');
PAINT_TOOL.addEventListener('click', paintToolActivated);
PAINT_TOOL.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    paintToolActivated();
  }
});

/*
  TODO: Implement Feature that Remove Color on a Grid
  -------------------------------------------------------------
*/
function eraseToolActivated() {
  const PIXEL_CANVAS = document.querySelector('#pixelCanvas');
  PIXEL_CANVAS.classList.remove('paint-mode', 'eye-dropper-mode');

  let boundHiLiteActiveTool = hiLiteActiveTool.bind(ERASE_TOOL);
  boundHiLiteActiveTool();

  function removeGridPaint(event) {
    let activeGrid = event.target;
    if (activeGrid.nodeName === 'TD' &&
      ERASE_TOOL.classList.contains('activated')) {
      activeGrid.style.backgroundColor = '';
    }
  }

  PIXEL_CANVAS.classList.add('erase-mode');
  PIXEL_CANVAS.addEventListener('click', removeGridPaint);
}

const ERASE_TOOL = document.querySelector('.erase-tool');
ERASE_TOOL.addEventListener('click', eraseToolActivated);
ERASE_TOOL.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    eraseToolActivated();
  }
});

/*
  TODO: Implement Feature that Picks Color Dynamically on the Canvas  *** Color Picker Effect ***
  -------------------------------------------------------------------
*/
function eyeDropperToolActivated() {
  const PIXEL_CANVAS = document.querySelector('#pixelCanvas');
  PIXEL_CANVAS.classList.remove('paint-mode', 'erase-mode');

  let boundHiLiteActiveTool = hiLiteActiveTool.bind(EYE_DROPPER_TOOL);
  boundHiLiteActiveTool();

  function rgbToHex(rgbArr) {
    let hexArr = rgbArr.map(rgbColorChannel => {
      let hexColorChannel = Number(rgbColorChannel).toString(16);
      return (hexColorChannel.length === 1) ? '0' + hexColorChannel : hexColorChannel
    });
    return '#' + hexArr.join('');
  }

  function eyeDropper(event) {
    const COLOR_PICKER = document.querySelector('#colorPicker');
    let activeGrid = event.target;
    let colorToBePicked = activeGrid.style.backgroundColor;

    if (activeGrid.nodeName === 'TD' &&
      colorToBePicked !== '' &&
      EYE_DROPPER_TOOL.classList.contains('activated')) {
      colorInRgb = colorToBePicked
        .replace(/[rgb()\s]/gi, '')
        .split(',');
      COLOR_PICKER.value = rgbToHex(colorInRgb);
      activeColor = COLOR_PICKER.value;
    }
  }

  PIXEL_CANVAS.classList.add('eye-dropper-mode');
  PIXEL_CANVAS.addEventListener('click', eyeDropper);
}

const EYE_DROPPER_TOOL = document.querySelector('.eye-dropper-tool');
EYE_DROPPER_TOOL.addEventListener('click', eyeDropperToolActivated);
EYE_DROPPER_TOOL.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    eyeDropperToolActivated();
  }
});

/*
  TODO: Implement Feature that Removes all Colored Grids on the Canvas
  ---------------------------------------------------------------------
*/
function clearCanvas() {
  let wantToClear = window.confirm(
    '\nWARNING MESSAGE:\n\n' + 'Do you want to clear the design canvas?'
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

const CLEAR_CANVAS_TOOL = document.querySelector('.clear-canvas-tool');
CLEAR_CANVAS_TOOL.addEventListener('click', clearCanvas);
CLEAR_CANVAS_TOOL.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    clearCanvas();
  }
});

/*
  TODO: Add Feature that Appends User "Signature" on their Design
  -------------------------------------------------------------------
*/
const SIGNATURE_BOX = document.querySelector('.user-signature');

function appendMySignature(string) {
  SIGNATURE_BOX.textContent = string;
}

SIGNATURE_BOX.addEventListener('click', function () {
  let userSignature = window.prompt('Please Enter Your Choice Name');
  appendMySignature(userSignature);
});