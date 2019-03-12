columns = 10;
rows = 10;
let caseWidth;
let caseHeight;
nbMines =20;
let grid = [];
let firstClick;
let mode = 'click';
let nbBombsLeft;

function setup ()  {
   let canvas = createCanvas(300,300);
   let test = document.getElementsByClassName("data-bombs-left")[0];
   test.innerText  = "test";
   console.log(test);
    canvas.parent('minesweeper-field');
    background(0);
    stroke(255);
    init();
}

function draw() {
  drawGrid();
}
