
function updateTimer() {
  let timer = document.getElementsByClassName("data-timer")[0];
  let timeRaw = timer.innerText;
  let minutes = parseInt(timeRaw.split(':')[0]);
  let seconds = parseInt(timeRaw.split(':')[1]);
  seconds++;
  if(seconds < 10) {
    seconds = "0"+seconds;
  }
  if(seconds == 60) {
    seconds = "00";
    minutes++;
  }
  if(minutes < 10) {
    minutes = "0"+minutes;
  }
  let timeFormated = minutes+':'+seconds;
  timer.innerText = timeFormated;
}

function getRandomInt(max) {
  return Math.round(Math.random() * Math.floor(max));
}



function isIn(vari, start, end) {
    if((vari >= start) &&(vari < end)) {
      return true;
    } else {
      return false;
    }
}
