var startButton = document.getElementById('start');
startButton.onclick = function() {
  startTimer();
}

function startTimer() {
  var startText = document.getElementById('start-text');

  if (startText.innerText == "Start") {
    startText.innerText = "Stop";
    // Start the actual timer.
    countDown(1500);
  } else if (startText.innerText == "Stop") {
    startText.innerText = "Start";
    // Add a button for reseting the timer when stopped
  }
}

function countDown(time, input) {
  var timer = document.getElementById('timer');

  x = setInterval(countDownInterval, 1000)

  function countDownInterval() {
    if (input = true) {
      minutes = Math.floor(time / 60);
      seconds = time % 60;

      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      timer.innerText = minutes + ":" + seconds;

      time--;
      if (time <= 0) {
        clearInterval(x);
      }
    }
  }
}
