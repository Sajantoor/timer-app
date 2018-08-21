var startButton = document.getElementById('start');
// change to 1500
var timeValue = 1500;
var timerEnabled = true;
var timesCompleted = 0;
var br = false;

Notification.requestPermission().then(function(result) {
  if (result == 'granted') {
    console.log('notifications are on!');
    window.notify = true;
  } else {
    console.log('Notifications are off!');
    window.notify = false;
  }
});

document.getElementById('task').value = "";

function startTask() {
  value = document.getElementById('task').value;
  if (value.replace(/\s+/g,' ').trim()) {
    startTimer();
    document.getElementById('task').style = "display: none;";
    document.getElementById('taskText').innerText = "Task: " + value.replace(/\s+/g,' ').trim();
    document.getElementById('finish').style = "display: block;";
  } else {
    alert('Please add a task you want to work on!');
  }
}

startButton.onclick = startTask;

document.addEventListener('keypress', function(event)  {
  var input = document.getElementById('task');
  if (document.activeElement === input) {
    if (event.keyCode == '13') {
      startTask();
    }
  }
});

document.getElementById('reset').onclick = function() {
  if (timerEnabled !== true) {
    timerEnabled = true;
    document.getElementById('start-text').innerText = "Stop";
    document.getElementById('reset').removeAttribute('style');
    timesCompleted = 0;
    setTimeout(function() {
        countDown(1500);
    }, 1000);
  }
}

function startTimer() {
  var startText = document.getElementById('start-text');
  if (startText.innerText == "Start") {
    document.getElementById('reset').removeAttribute('style');
    startText.innerText = "Stop";
    window.timerEnabled = true;
    document.getElementById('description').innerText = "Work Time!";
    // Start the actual timer.
    setTimeout(function() {
      countDown(timeValue);
    }, 1000);
  } else if (startText.innerText == "Stop") {
    startText.innerText = "Start";
    window.timerEnabled = false;
    document.getElementById('reset').style = "visibility: visible; opacity: 1.0;";
  }
}

function countDown(time) {
  var timer = document.getElementById('timer');

  if (time == 0) {
    clearInterval(x);
    timer.innerText = "25:00";
  } else {
    if (timerEnabled) {
      x = setInterval(countDownInterval, 1000);
    }
  }

  function countDownInterval() {
    if (timerEnabled) {
      time--;

      if (time <= 0) {
        if (window.notify) {
          var body = "Work time is up! Your break is now starting!";
          var n = new Notification(body, {icon: 'icon.svg'})
        }
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
  document.getElementById('start').style = "visibility: hidden";
  document.getElementById('description').innerText = "Break Time!";
  // Change to 300
  if (timesCompleted <= 4) {
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
      if (window.notify) {
        var body = "Task completed! Start another task!";
        var n = new Notification(body, {icon: 'icon.svg'})
      }
      resetBreak();
      document.getElementById('task').style = "";
      document.getElementById('taskText').innerText = "";
      document.getElementById('task').value = "";
    }, 1801000);
  }

  function resetBreak() {
    document.body.style.backgroundColor = "";
    window.br = false;
    document.getElementById('start').style = "";
    document.getElementById('description').innerText = "Work Time!";
  }
}

document.getElementById('finish').addEventListener('click', function() {
  document.body.style.backgroundColor = "";
  window.br = false;
  timesCompleted = 0;
  document.getElementById('start').style = "";
  document.getElementById('task').style = "";
  document.getElementById('taskText').innerText = "";
  document.getElementById('task').value = "";
  document.getElementById('finish').style = "";
  document.getElementById('start-text').innerText = "Start";
  document.getElementById('reset').style = "";
  timeValue = 1500;
  countDown(0);
})

// Notification feature
// Done button so it can stop the interval and change the task entirely, this is only avaliable
// during work times.
