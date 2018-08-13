var startButton = document.getElementById('start');
// change to 1500
var timeValue = 1500;
var timerEnabled = true;
var timesCompleted = 0;
var br = false;

document.getElementById('task').value = "";

startButton.onclick = function() {
  value = document.getElementById('task').value;
  if (value.replace(/\s+/g,' ').trim()) {
    startTimer();
    document.getElementById('task').style = "display: none;";
    document.getElementById('taskText').innerText = "Task: " + value.replace(/\s+/g,' ').trim();
  } else {
    alert('Please add a task you want to work on!');
  }
}

document.getElementById('reset').onclick = function() {
  if (timerEnabled !== true) {
    timerEnabled = true;
    document.getElementById('start-text').innerText = "Stop";
    document.getElementById('reset').removeAttribute('style');
    timesCompleted = 0;
    countDown(1500);
  }
}

function startTimer() {
  var startText = document.getElementById('start-text');
  if (startText.innerText == "Start") {
    document.getElementById('reset').removeAttribute('style');
    startText.innerText = "Stop";
    window.timerEnabled = true;
    // Start the actual timer.
    countDown(timeValue);
  } else if (startText.innerText == "Stop") {
    startText.innerText = "Start";
    window.timerEnabled = false;
    document.getElementById('reset').style = "visibility: visible; opacity: 1.0;";
  }
}

function countDown(time) {
  var timer = document.getElementById('timer');

  if (timerEnabled) {
    x = setInterval(countDownInterval, 1000);
  }

  function countDownInterval() {
    if (timerEnabled) {
      time--;

      if (time <= 0) {
        clearInterval(x);
        window.timesCompleted++;
        if (br !== true) {
          breakTime();
        }
      }

      minutes = Math.floor(time / 60);
      seconds = time % 60;
      DisplaySeconds = seconds;

      if (seconds < 10) {
        DisplaySeconds = "0" + seconds;
      }

      timer.innerText = minutes + ":" + DisplaySeconds;
    } else {
      var sixty = (minutes * 60);
      console.log("seconds: " + seconds + " minutes: " + minutes + " minutes times 60: " + sixty);
      window.timeValue = seconds + (minutes * 60);
      console.log(window.timeValue);
      clearInterval(x);
    }
  }
}

function breakTime() {
  window.br = true;
  document.body.style.backgroundColor = "#3498db";
  // Change to 300
  if (timesCompleted < 4) {
    countDown(300);
      // Change to 301000
    setTimeout(function() {
      resetBreak();
      countDown(timeValue);
    }, 301000);

  } else {
    // Change to 1800
    countDown(1800);
    timesCompleted = 0;
    // Change to 1801000
    setTimeout(function() {
      resetBreak();
      document.getElementById('task').style = "";
      document.getElementById('taskText').innerText = "";
      document.getElementById('task').value = "";
    }, 1801000);
  }

  function resetBreak() {
    document.body.style.backgroundColor = "";
    window.br = false;
  }
}


// Notification feature
// BUG: Issue on break as it doesn't stop the "setTimeout" when it's stopped function.
