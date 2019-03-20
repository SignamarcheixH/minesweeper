document.addEventListener("DOMContentLoaded", () => {
  let playButton = document.getElementsByClassName("btn-play")[0];
  let optionsButton = document.getElementsByClassName("btn-options")[0];
  let leaderboardButton = document.getElementsByClassName("btn-leaderboard")[0];

  let mainMenu = document.getElementsByClassName("main-menu")[0];
  let optionMenu = document.getElementsByClassName("option-menu")[0];
  let minesweeperHud = document.getElementsByClassName("minesweeper-hud")[0];
  let minesweeperField = document.getElementById("minesweeper-field");
  let topBar  = document.getElementsByClassName("top-bar-hud")[0];

  let closeButton = topBar.getElementsByClassName("icon-close")[0];
  let backButton = document.getElementsByClassName("btn-back")[0];


  closeButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    canvas = resizeCanvas(0,0);
    grid = [];
    displayMainMenu();
    });


  playButton.addEventListener("click", () => {
    mainMenu.classList.add("is-hidden");
    minesweeperHud.classList.remove("is-hidden");
    minesweeperField.classList.remove("is-hidden");
    topBar.classList.remove("is-hidden");
    let sizeLine = optionMenu.getElementsByClassName("size-line")[0];
    let difficultyLine = optionMenu.getElementsByClassName("difficulty-line")[0];
    let sizeActive = sizeLine.getElementsByClassName("is-active")[0];
    let difficultyActive = difficultyLine.getElementsByClassName("is-active")[0];

    let gameWidth = parseInt(sizeActive.dataset.width);
    let gameHeight = parseInt(sizeActive.dataset.height);
    let gameCols = parseInt(sizeActive.dataset.cols);
    let gameRows = parseInt(sizeActive.dataset.rows);
    let gameMines = parseInt(difficultyActive.dataset.mines);

    initGame(gameWidth, gameHeight, gameCols, gameRows, gameMines);
  });

  optionsButton.addEventListener("click", () => {
    displayOptionsMenu();
  });

  leaderboardButton.addEventListener("click", () => {
    displayLeaderboard();
  });
});

function displayMainMenu() {
  let mainMenu = document.getElementsByClassName("main-menu")[0];
  let optionMenu = document.getElementsByClassName("option-menu")[0];
  let minesweeperHud = document.getElementsByClassName("minesweeper-hud")[0];
  let minesweeperField = document.getElementById("minesweeper-field");

  let topBar = document.getElementsByClassName("top-bar-hud")[0];

  topBar.classList.add("is-hidden");
  mainMenu.classList.remove("is-hidden");
  optionMenu.classList.add("is-hidden");
  //leaderboardMenu.classList.add("is-hidden"):
  minesweeperHud.classList.add("is-hidden");
  minesweeperField.classList.add("is-hidden");
}

function displayOptionsMenu() {
  let mainMenu = document.getElementsByClassName("main-menu")[0];
  let optionMenu = document.getElementsByClassName("option-menu")[0];
  let minesweeperHud = document.getElementsByClassName("minesweeper-hud")[0];
  let minesweeperField = document.getElementById("minesweeper-field");
  let topBar  = document.getElementsByClassName("top-bar-hud")[0];
  let backButton = document.getElementsByClassName("btn-back")[0];
  let sizeLine = optionMenu.getElementsByClassName("size-line")[0];
  let difficultyLine = optionMenu.getElementsByClassName("difficulty-line")[0];
  let optionsSizeButtons = [...sizeLine.getElementsByClassName("btn-option")];
  let optionsDifficultyButtons = [...difficultyLine.getElementsByClassName("btn-option")];

  mainMenu.classList.add("is-hidden");
  minesweeperHud.classList.add("is-hidden");
  minesweeperField.classList.add("is-hidden");
  optionMenu.classList.remove("is-hidden");

optionsSizeButtons.forEach((el)=> {
  el.addEventListener("click", ()=> {
      let oldActive = sizeLine.getElementsByClassName("is-active")[0];
      oldActive.classList.remove("is-active");
      el.classList.add("is-active");
  });

  initPreview();
});

optionsDifficultyButtons.forEach((el)=> {
  el.addEventListener("click", ()=> {
      let oldActive = difficultyLine.getElementsByClassName("is-active")[0];
      oldActive.classList.remove("is-active");
      el.classList.add("is-active");
  });
});

  backButton.addEventListener("click", () => {
      displayMainMenu();
  });
}



function initPreview() {
  /* leads the whole initialisation */
  nbMines = 5;
  columns = 5;
  rows = 5;
  grid = [];
  let previewCanvas = createCanvas(100,100);
   previewCanvas.parent('window-preview');
   background(0);
   stroke(255);
  caseWidth = round(width / columns);
  caseHeight = round(height / rows);
  setCasesPreview();
  returnCase(20);
}

function setCasesPreview() {
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
      let tuple = ""+i+","+j+"";
      let cell = new Object();
      switch(tuple) {
         case "0,1":
         case "0,2":
         case "2,2":
         case "2,3":
         case "3,4":
          cell.state = 1;
          cell.flagged = 1;
          cell.mines = -1;
          cell.coords  = [[posXS, posXE], [posYS, posYE]];
          grid.push(cell);
          break;
          default:
              cell.state = 0;                                                                  // 0 : undiscovered,    1: mined    2 : returned
              cell.flagged = 0;
              cell.mines = -1;
              cell.coords  = [[posXS, posXE], [posYS, posYE]];
              grid.push(cell);
              break;
      }
    }
  }
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
