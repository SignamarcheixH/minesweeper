document.addEventListener("DOMContentLoaded", () => {
  let playButton = document.getElementsByClassName("btn-play")[0];
  let optionsButton = document.getElementsByClassName("btn-options")[0];
  let leaderboardButton = document.getElementsByClassName("btn-leaderboard")[0];

  let mainMenu = document.getElementsByClassName("main-menu")[0];
  let minesweeperHud = document.getElementsByClassName("minesweeper-hud")[0];
  let topBar  = document.getElementsByClassName("top-bar-hud")[0];

  let closeButton = topBar.getElementsByClassName("icon-close")[0];

  closeButton.addEventListener("click", () => {
          
  });


  playButton.addEventListener("click", () => {
    mainMenu.classList.add("is-hidden");
    minesweeperHud.classList.remove("is-hidden");
    topBar.classList.remove("is-hidden");
    initGame();
  });
  optionsButton.addEventListener("click", () => {
    displayOptionsMenu();
  });
  leaderboardButton.addEventListener("click", () => {
    displayLeaderboard();
  });
});
