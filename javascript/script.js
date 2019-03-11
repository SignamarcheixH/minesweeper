columns = 10;
rows = 10;
let caseWidth;
let caseHeight;
nbMines =20;
let grid = [];
let firstClick;
let mode = 'click';


function setup ()  {
   let canvas = createCanvas(300,300);
    canvas.parent('minesweeper-field');
    background(0);
    stroke(255);
    init();
}

function draw() {
  drawGrid();
}
