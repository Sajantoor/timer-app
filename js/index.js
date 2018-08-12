var startButton = document.getElementById('start');
startButton.onclick = function() {
  startTimer();
}

function startTimer() {
  var startText = document.getElementById('start-text');

  if (startText.innerText == "Start") {
    startText.innerText = "Stop";
    // Start the actual timer.
    x = setInterval(function() {
      countDown(1500);
    }, 1000);
  } else if (startText.innerText == "Stop") {
    startText.innerText = "Start";
    // Add a button for reseting the timer when stopped
  }
}

function countDown(time) {
  var timer = document.getElementById('timer');
  console.log('Hello!')
  countDownInterval(time);
  // x = setInterval(countDownInterval, 1000)
}

function countDownInterval(time) {
    console.log('world!')
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
