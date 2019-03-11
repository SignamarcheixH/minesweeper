/////////////////////////////////////////////////////////
/////////////  DRAWING FUNCTIONS  /////////////
////////////////////////////////////////////////////////

/*-------------------
|       Grid         |
--------------------*/

function drawGrid() {
  for(let i=0; i<grid.length; i++) {
    let color = 100;
    let elem = grid[i].coords;
    if(grid[i].state == 1) {
        color = 150;
    }
    if(grid[i].state == 2 ) {
      color = 255;
    }
    if(grid[i].flagged == 1) {
      color = (255,0,0);
    }
    fill(color);
    //console.log(color);
    rect(elem[0][0], elem[1][0], caseWidth, caseHeight);
    if(grid[i].state == 2 ) {
      drawNumber(grid[i]);
    }
  }
}



/*-------------------
|       Dots         |
--------------------*/

function drawOne(posXS, posYS) {
    fill(0);
    ellipse(posXS+(caseWidth/2), posYS+(caseHeight/2), 5, 5);
}

function drawTwo(posXS, posYS) {
  fill(0);
  ellipse(posXS+(caseWidth/3), posYS+(caseHeight/3), 5, 5);
  ellipse(posXS+(caseWidth*(2/3)), posYS+(caseHeight*(2/3)), 5, 5);
}

function drawThree(posXS, posYS) {
  drawTwo(posXS, posYS);
  drawOne(posXS, posYS);
}

function drawFour(posXS, posYS) {
    drawTwo(posXS, posYS);
    ellipse(posXS+(caseWidth*(2/3)), posYS+(caseHeight/3), 5, 5);
    ellipse(posXS+(caseWidth/3), posYS+(caseHeight*(2/3)), 5, 5);
}

function drawFive(posXS,posYS) {
    drawFour(posXS, posYS);
    drawOne(posXS, posYS);
}

function drawSix(posXS, posYS) {
  drawFour(posXS, posYS);
  ellipse(posXS+(caseWidth/3), posYS+(caseHeight/2), 5, 5);
  ellipse(posXS+(caseWidth*(2/3)), posYS+(caseHeight/2), 5, 5);
}



/*----------------------
|  Drawing utils  |
------------------------*/

function drawNumber(c) {
  posXS = c.coords[0][0];
  posYS = c.coords[1][0];
  switch(c.mines) {
    case 1 :
      drawOne(posXS, posYS);
      break;
    case 2 :
      drawTwo(posXS, posYS);
      break;
   case 3 :
      drawThree(posXS, posYS);
      break;
   case 4 :
      drawFour(posXS, posYS);
      break;
  case 5 :
      drawFive(posXS, posYS);
      break;
  case 6 :
      drawSix(posXS, posYS);
      break;
  }
}
