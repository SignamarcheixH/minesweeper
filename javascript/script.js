let caseWidth;
let caseHeight;
let grid=[];
let firstClick;
let mode = 'click';
let nbBombsLeft;
let timerInterval;
let flagStyle = 'default';
let tilesStyle = 'default';

function setup ()  {
    displayMainMenu();
}

function draw() {
  drawGrid();
}
