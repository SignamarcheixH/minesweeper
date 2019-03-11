/////////////////////////////////////////////////////////
/////////////  GAME FUNCTIONS  //////////////////
////////////////////////////////////////////////////////


/*-------------------
|       Init          |
--------------------*/

function init() {
  /* leads the whole initialisation */
  caseWidth = round(width / columns);
  caseHeight = round(height / rows);
  firstClick = true;
  oldCase = null;
  setCases();
}

function setCases() {
  /* sets the whole grid*/
  let posXS;
  let posXE;
  let posYE;
  let posYS;
  for(let i=0;i<rows;i++) {
    posYS = i * caseHeight;
    posYE = posYS + caseHeight;
    for(let j = 0; j<columns; j++) {
      posXS = j * caseWidth;
      posXE = posXS + caseWidth;
      let cell = new Object();
      cell.state = 0;                                                                  // 0 : undiscovered,    1: mined    2 : returned
      cell.flagged = 0;
      cell.mines = -1;
      cell.coords  = [[posXS, posXE], [posYS, posYE]];
      grid.push(cell);
    }
  }
  setMines();
}

function setMines() {
  /* places as much mines as requested in the game's parameters*/
  let s = nbMines;
  while( s != 0 ) {
     let idx = getRandomInt(grid.length-1);
     if (grid[idx].state != 1) {
       grid[idx].state = 1;
       s--;
     }
  }
}


function getCase(mouseX, mouseY) {
  /* return the index of the clicked case */
   for(let i=0; i<grid.length; i++) {
      let elem = grid[i].coords;
      let posXS = elem[0][0];
      let posXE = elem[0][1];
      let posYS = elem[1][0];
      let posYE = elem[1][1];
      if( (isIn(mouseX, posXS, posXE)) && (isIn(mouseY, posYS, posYE))) {
        return(i);
      }
   }
   return(-1);
}


function returnCase(idx) {
  /* returns the case */
  let cell = grid[idx];
  if(cell.flagged != 1 ) {
    if(cell.state == 0) {                                    // if the case has not been returned yet
      cell.state = 2;                                                         //state == 2 -> case returned
      cell.mines = revealMines(idx);
      firstClick = false;
      if(cell.mines == 0 ) {                              //if the case is blank, we keep returning neighbours
        let neighbours = getNeighbours(idx);
        for(let i = 0; i<neighbours.length; i++) {
          returnCase(neighbours[i]);
        }
      }
    } else if (cell.state == 1) {                       //if the case is a mine
      if (firstClick) {
        location.reload();
      } else {
        alert("perdu");
      }
    } else {

    }
  }
}

function flagCase(idx) {
  /* flag the case */
  let cell = grid[idx];
  if((cell.state != 2) && (cell.flagged == 0)) {
    cell.flagged = 1;
  } else if ((cell.state != 2 )&&(cell.flagged ==1)) {
    cell.flagged = 0;
  }
  console.log(cell.flagged);
}

function revealMines(idx) {
  /* count the surrounding mines */
  let elem = grid[idx];
  let number = 0;
  let  neighbours = getNeighbours(idx);
  for(let i =0; i<neighbours.length; i++) {
    if(grid[neighbours[i]].state == 1) {
      number+=1;
    }
  }
  return(number);
}


function getNeighbours(idx) {
  /* get true neighbours of case */
  let elem = grid[idx];
  let neighbours=[];
  if(idx - 1 >= 0 ) {
    let prev = grid[idx-1];
    if(prev.coords[1][0] == elem.coords[1][0]) {
      neighbours.push(idx-1);
    }
  }
  if(idx + 1 < columns*rows ) {
    let next = grid[idx+1];
    if(next.coords[1][0] == elem.coords[1][0]) {
      neighbours.push(idx+1);
    }
  }
  if(idx-columns >= 0 ) {
    let top = grid[idx-columns];
    if(top.coords[1][1] == elem.coords[1][0]) {
      neighbours.push(idx-columns);
    }
  }
  if(idx + columns  < columns*rows ) {
    let bottom = grid[idx+columns];
    if(bottom.coords[1][0] == elem.coords[1][1]) {
      neighbours.push(idx+columns);
    }
  }
  if(idx - columns -1 >= 0 ) {
    let cornUL = grid[idx-columns-1];
    if(cornUL.coords[1][1] == elem.coords[1][0]) {
      neighbours.push(idx-columns-1);
    }
  }
  if(idx - columns +1 >= 1 ) {
    let cornUR = grid[idx-columns+1];
    if(cornUR.coords[0][0] == elem.coords[0][1]) {
      neighbours.push(idx-columns+1);
    }
  }
  if(idx + columns -1 < rows*columns-1 ) {
    let cornBL = grid[idx+columns-1];
    if(cornBL.coords[1][0] == elem.coords[1][1]) {
      neighbours.push(idx+columns-1);
    }
  }
  if(idx + columns +1 < rows*columns ) {
    let cornBR = grid[idx+columns+1];
    if(cornBR.coords[1][0] == elem.coords[1][1]) {
      neighbours.push(idx+columns+1);
    }
  }
  return neighbours;
}

function mousePressed() {
  /* handle clicks on every game's area */
  let canvasArea = document.getElementById("defaultCanvas0");
  let clickArea = document.getElementsByClassName("click-mode")[0];
  let flagArea = document.getElementsByClassName("flag-mode")[0];

  canvasArea.addEventListener("click", () => {   //click on canvas
   let idx = getCase(mouseX, mouseY);
     if(grid[idx].state != 2) {                                     //if case is undiscovered yet
       if(mode == "click") {
         returnCase(idx);
       } else {
         if (grid[idx] != oldCase) {
            oldCase = grid[idx];
            flagCase(idx);
        }
     }
   }
 });
 clickArea.addEventListener("click" , () =>{    //click on clickButton
   if(!clickArea.classList.contains("is-active")) {
     switchMode();
   }
 });
 flagArea.addEventListener("click" , () =>{     //click on flagButton
   if(!flagArea.classList.contains("is-active")) {
     switchMode();
   }
 });
}


 function keyReleased() {
   if (keyCode == 32) {
     switchMode();
   }
 }

function switchMode() {
  let clickArea = document.getElementsByClassName("click-mode")[0];
  let flagArea = document.getElementsByClassName("flag-mode")[0];
  clickArea.classList.toggle("is-active");
  flagArea.classList.toggle("is-active");
  if(mode == "click") {
    mode = "flag"
  } else {
    mode = "click";
  }
}
