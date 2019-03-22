/////////////////////////////////////////////////////////
/////////////  DRAWING FUNCTIONS  /////////////
////////////////////////////////////////////////////////

/*-------------------
|       Grid         |
--------------------*/

function drawGrid() {
  for(let i=0; i<grid.length; i++) {
    fill(100);
    let elem = grid[i].coords;
    if(grid[i].state == 1) {
        fill(150);
    }
    if(grid[i].state == 2 ) {
      fill(249, 255, 250);
    }

    rect(elem[0][0], elem[1][0], caseWidth, caseHeight);
    if(grid[i].flagged == 1) {
      drawFlag(grid[i]);
    }
    if(grid[i].state == 2 ) {
      drawNumber(grid[i]);
    }
  }
}

/*-------------------
|       Flag         |
--------------------*/

function drawBlueFlag(c) {
  posXS = c.coords[0][0];
  posYS = c.coords[1][0];
  fill(0);
  noStroke();
  //the flag's pole
  rect(posXS+(caseWidth / 2)-2, posYS+(caseHeight / 5), 3, (2*caseHeight/3));
  //the flag's base
  rect(posXS+(caseWidth/6), posYS+(4*caseHeight/5),(4*caseWidth/6), 3);
  fill(0,0,255);
  //the triangle's points are ordered as : top, right, bottom
  triangle(posXS+(caseWidth / 2)+1,posYS+(caseHeight / 5),   posXS+(5*caseWidth / 6),posYS+(caseHeight / 2)-2,    posXS+(caseWidth / 2)+1, posYS+(4* caseHeight / 6), )
  stroke(255);
}

function drawRedFlag(c) {
  posXS = c.coords[0][0];
  posYS = c.coords[1][0];
  fill(0);
  noStroke();
  //the flag's pole
  rect(posXS+(caseWidth / 2)-2, posYS+(caseHeight / 5), 3, (2*caseHeight/3));
  //the flag's base
  rect(posXS+(caseWidth/6), posYS+(4*caseHeight/5),(4*caseWidth/6), 3);
  fill(255,0,0);
  //the triangle's points are ordered as : top, right, bottom
  triangle(posXS+(caseWidth / 2)+1,posYS+(caseHeight / 5),   posXS+(5*caseWidth / 6),posYS+(caseHeight / 2)-2,    posXS+(caseWidth / 2)+1, posYS+(4* caseHeight / 6), )
  stroke(255);
}

/////////////////////////////////////////////////////////
/////////////  NUMBER DRAWING //////////////////
////////////////////////////////////////////////////////

/*-------------------
|       Dots         |
--------------------*/

function drawOneDots(posXS, posYS, colored) {
    //fill(0);
    ellipse(posXS+(caseWidth/2), posYS+(caseHeight/2), 5, 5);
}

function drawTwoDots(posXS, posYS, colored) {
  //fill(0);
  ellipse(posXS+(caseWidth/3), posYS+(caseHeight/3), 5, 5);
  ellipse(posXS+(caseWidth*(2/3)), posYS+(caseHeight*(2/3)), 5, 5);
}

function drawThreeDots(posXS, posYS, colored) {
  drawTwoDots(posXS, posYS, colored);
  drawOneDots(posXS, posYS, colored);
}

function drawFourDots(posXS, posYS, colored) {
    drawTwoDots(posXS, posYS, colored);
    ellipse(posXS+(caseWidth*(2/3)), posYS+(caseHeight/3), 5, 5);
    ellipse(posXS+(caseWidth/3), posYS+(caseHeight*(2/3)), 5, 5);
}

function drawFiveDots(posXS,posYS, colored) {
    drawFourDots(posXS, posYS, colored);
    drawOneDots(posXS, posYS, colored);
}

function drawSixDots(posXS, posYS, colored) {
  drawFourDots(posXS, posYS, colored);
  ellipse(posXS+(caseWidth/3), posYS+(caseHeight/2), 5, 5);
  ellipse(posXS+(caseWidth*(2/3)), posYS+(caseHeight/2), 5, 5);
}



/*----------------------
|  Drawing utils  |
------------------------*/


function drawFlag(c) {
      switch(flagStyle) {
          case 'default':
            drawRedFlag(c);
            break;
          case 'blueFlag':
            drawBlueFlag(c);
            break;
      }
}


function drawNumber(c) {
      switch(tilesStyle) {
          case 'default':
            drawNumberDots(c, false);
            break;
          case 'coloredDots':
            drawNumberDots(c, true);
            break;
      }
}

function drawNumberDots(c,colored) {
  posXS = c.coords[0][0];
  posYS = c.coords[1][0];
  switch(c.mines) {
    case 1 :
      (colored) ? fill(0,0,255) : fill(0);
      drawOneDots(posXS, posYS, colored);
      break;
    case 2 :
      (colored) ? fill(0,128,0) : fill(0);
      drawTwoDots(posXS, posYS, colored);
      break;
   case 3 :
      (colored) ? fill(255,0,0) : fill(0);
      drawThreeDots(posXS, posYS, colored);
      break;
   case 4 :
      (colored) ? fill(139,0,139) : fill(0);
      drawFourDots(posXS, posYS, colored);
      break;
  case 5 :
      (colored) ? fill(128,0,0) : fill(0);
      drawFiveDots(posXS, posYS, colored);
      break;
  case 6 :
      (colored) ? fill(64,224,208) : fill(0);
      drawSixDots(posXS, posYS, colored);
      break;
  }
}


function drawNumberKanji(c) {
  posXS = c.coords[0][0];
  posYS = c.coords[1][0];
  switch(c.mines) {
    case 1 :
      drawOneKanji(posXS, posYS);
      break;
    case 2 :
      drawTwoKanji(posXS, posYS);
      break;
   case 3 :
      drawThreeKanji(posXS, posYS);
      break;
   case 4 :
      drawFourKanji(posXS, posYS);
      break;
  case 5 :
      drawFiveKanji(posXS, posYS);
      break;
  case 6 :
      drawSixKanji(posXS, posYS);
      break;
  }
}
