// Timer Display
const countdownElm = document.getElementById("countdown");
// Controller
const start = document.getElementById("start");
const up = document.getElementById("up");
const down = document.getElementById("down");
const reset = document.getElementById("reset");
// Check the state of counting down or not
let on = false;
// Default setting
let startingMinutes = 10;
// Convert startingMuinutes to seconds
let time = startingMinutes * 60;

// Functions
function updateCountdown() {
  if (time > 0) {
    time--;
  } else {
    return;
  }
  let minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, 0);
  let seconds = (time % 60).toString().padStart(2, 0);
  // console.log(minutes, seconds);
  countdownElm.innerHTML = `${minutes}:${seconds}`;
}

function updateTimer() {
  let minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, 0);
  let seconds = (time % 60).toString().padStart(3, 0);
  countdownElm.innerHTML = `${minutes}:${seconds}`;
}

function resetTimer() {
  if (!on) {
    startingMinutes = 10;
    time = startingMinutes * 60;
    updateTimer();
  }
}

let intervalId;
const startSign = `<i class="fas fa-play"></i>`;
const stopSign = `<i class="fas fa-stop"></i>`;

function startTimer() {
  if (!on) {
    intervalId = setInterval(() => {
      updateCountdown();
    }, 1000);
    on = true;
    start.innerHTML = stopSign;
  } else {
    stopTimer();
    on = false;
    start.innerHTML = startSign;
  }
}
function stopTimer() {
  clearInterval(intervalId);
}

// Events
start.addEventListener("click", () => {
  startTimer();
});

reset.addEventListener("click", () => {
  resetTimer();
});

up.addEventListener("click", () => {
  if (!on && startingMinutes < 60) {
    startingMinutes++;
    time = startingMinutes * 60;
    updateTimer();
    // console.log(time, startingMinutes);
  }
});

down.addEventListener("click", () => {
  if (!on && startingMinutes > 0) {
    startingMinutes--;
    time = startingMinutes * 60;
    updateTimer();
    // console.log(time, startingMinutes);
  }
});
