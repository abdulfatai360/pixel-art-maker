/**
 * @file JavaScript program for the interactivity and implementation of features of Pixel Art Maker web application.
 * @author Abdulfatai Jimoh <abdulfatai360@gmail.com>
 * @version 1.0
 */

/*
  TODO: Implement feature that toggles header and toolbar display
  ----------------------------------------------------------------
*/
/**
 * @global
 * @default
 * @constant {HTMLDivElement} MENU_ICON
 */
const MENU_ICON = document.querySelector('.menu-item');

/**
 * @method addEventListener
 * @param {string} click The event type to listen for.
 * @param {eventCallback} anonymous The callback that handles when the element is clicked.
 */
MENU_ICON.addEventListener('click', function() {
  /**
   * @private
   * @default
   * @constant {HTMLHeaderElement} HEADER
   */
  const HEADER = document.querySelector('header');
  
  /**
   * @method toggle
   * @description Add or remove a class name.
   * @param {string} className Value of class name to add or remove.
   */
  HEADER.classList.toggle('close-menu-toolbar');
});

/*
  TODO: Implement Feature that Grabs and Stores Active Color Value
  -----------------------------------------------------------------
*/
/**
 * @global
 * @default
 * @var {string} activeColor
 * @description Contains the hex value of the currently active (selected) color to be used for painting the grids.
 */
let activeColor;

/**
 * @function colorToBeUsed
 * @description Grabs and stores value of a color input field. It also assign the value to the activeColor variable.
 */
function colorToBeUsed() {
  /**
   * @private
   * @default
   * @constant {HTMLInputElement} COLOR_PICKER
   */
  const COLOR_PICKER = document.querySelector('#colorPicker');
  activeColor = COLOR_PICKER.value;
}

/*
  TODO: Block-scoped the "COLOR_PICKER" variable. I use this technique in the code going forward to avoid littering the global context.
*/
{
  /**
   * @private
   * @default
   * @constant {HTMLInputElement} COLOR_PICKER
   */
  const COLOR_PICKER = document.querySelector('#colorPicker');

  /**
   * @method addEventListener
   * @param {string} change The event type to listen for.
   * @param {eventCallback} colorToBeUsed The callback that handles when the of the color field changes. This callback grabs and stores the new value the color field is changed to.
   */
  COLOR_PICKER.addEventListener('change', colorToBeUsed);

  /**
   * @method addEventListener
   * @param {string} mouseover The event type to listen for.
   * @param {eventCallback} anonymous The callback that handles when a pointer device is moved over the color field. This callback sets the value of the title attribute of the color field's parent element to indicate the hex value of the active color.
   */
  COLOR_PICKER.addEventListener('mouseover', function () {
    COLOR_PICKER.parentNode.title = `Change Color (Active Color: ${(activeColor === undefined) ? '#000000' : activeColor})`;
  });
}

/*
  TODO: Implement Feature that Creates and Clears Canvas Grids
  -------------------------------------------------------------
*/
/**
 * @global
 * @callback {eventCallback}
 * @name makeGrid
 * @description Stores references to the fields needed to create the canvas, grabs their values, clears the previous grids on the canvas, and uses the values of the fields to create new grids using loops.
 */
function makeGrid() {  
  /**
   * @private
   * @default
   * @constant {HTMLInputElement} HEIGHT_FIELD
   */
  const HEIGHT_FIELD = document.querySelector('#inputHeight');

  /**
   * @private
   * @default
   * @constant {HTMLInputElement} WIDTH_FIELD
   */
  const WIDTH_FIELD = document.querySelector('#inputWidth');

  /**
   * @private
   * @default
   * @constant {HTMLTableElement} PIXEL_CANVAS
   */
  const PIXEL_CANVAS = document.querySelector('#pixelCanvas');

  /**
   * @description Clears all the children nodes of the PIXEL_CANVAS element.
   */
  while (PIXEL_CANVAS.firstChild) {
    PIXEL_CANVAS.removeChild(PIXEL_CANVAS.firstChild);
  }

  /**
   * @private
   * @var {number} inputHeight
   * @description Contains the value a user input in the field. This value represents the vertical dimension of the canvas.
   */
  let inputHeight = HEIGHT_FIELD.value;

  /**
   * @private
   * @var {number} inputWidth
   * @description Contains the value a user input in the field. This value represents the horizontal dimension of the canvas.
   */
  let inputWidth = WIDTH_FIELD.value;

  /**
   * @description Creates grids on the canvas using nested for loops.
   */
  for (let i = 1; i <= inputHeight; i++) {
    const TR = document.createElement('tr');
    PIXEL_CANVAS.appendChild(TR);

    for (let j = 1; j <= inputWidth; j++) {
      const TD = document.createElement('td');
      TR.appendChild(TD);
    }
  }

  /** 
   * @description Sets the number fields value back to the allowable max value
   */
  HEIGHT_FIELD.value = HEIGHT_FIELD.max;
  WIDTH_FIELD.value = WIDTH_FIELD.max;

  colorToBeUsed();

  /**
   * @method addEventListener
   * @param {string} mouseover The event type to listen for.
   * @param {eventCallback} anonymous The callback that handles when a pointer device is moved over the design canvas. However, event delegation technique is applied here to let the callback has effect on the canvas children node (<td></td>). This callback's functionality let users know the grid an action is to be performed on.
   */
  PIXEL_CANVAS.addEventListener('mouseover', function(event) {
    if (event.target.nodeName === 'TD') {
      event.target.classList.add('on-mode');
    }
  });

  /**
   * @method addEventListener
   * @param {string} mouseout The event type to listen for.
   * @param {eventCallback} anonymous The callback that handles when a pointer device is moved away on the design canvas. However, event delegation technique is applied here to let the callback has effect on the canvas children node (<td></td>).
   */
  PIXEL_CANVAS.addEventListener('mouseout', function (event) {
    if (event.target.nodeName === 'TD') {
      event.target.classList.remove('on-mode');
    }
  });
}

/**
  * @global
  * @default
  * @constant {HTMLInputElement} WIDTH_FIELD
 */
const WIDTH_FIELD = document.querySelector('#inputWidth');

/**
  * @method addEventListener
  * @param {string} keydown The event type to listen for.
  * @param {eventCallback} anonymous The callback that handles when the "Enter" key is pressed on the WIDTH_FIELD. This lets users easily creates grids without having to press the "Submit" button.
 */
WIDTH_FIELD.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    makeGrid();
  }
});

/**
  * @global
  * @default
  * @constant {HTMLButtonElement} CANVAS_CREATOR
 */
const CANVAS_CREATOR = document.querySelector('input[type=button]');

/**
  * @method addEventListener
  * @param {string} click The event type to listen for.
  * @param {eventCallback} makeGrid The callback that handles when CANVAS_CREATOR is clicked on. This lets users creates grids if they choose not to use the "Enter" key.
 */
CANVAS_CREATOR.addEventListener('click', makeGrid);

/*
  TODO: Implement Feature that Dynamically Paint Grid
  ----------------------------------------------------
*/
/**
  * @global
  * @default
  * @constant {HTMLDivElement[]} DESIGN_TOOLS
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