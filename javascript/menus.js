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