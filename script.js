/*
  TODO: Toggle Menu and Toolbar Display
  ---------------------------------------
*/
const MENU_ICON = document.querySelector('.menu-item');
const TOOLBAR_CONT = document.querySelector('.toolbar-container');
const APP_TITLE = document.querySelector('.app-title');

MENU_ICON.addEventListener('click', function() {
  const HEADER = document.querySelector('header');
  HEADER.classList.toggle('close-menu-toolbar');
});