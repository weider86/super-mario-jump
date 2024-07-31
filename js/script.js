let timerInterval;

const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const restart = document.querySelector(".restart");
const chronometer = document.querySelector(".chronometer");

window.onload = function () {
  let startTime = Date.now();

  function updateChronometer() {
    let elapsedTime = Date.now() - startTime;
    // let minutes = Math.floor(elapsedTime / 60000);
    let seconds = Math.floor((elapsedTime % 60000) / 1000);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    // minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;

    chronometer.textContent = `${seconds}.${milliseconds}`;
  }

  timerInterval = setInterval(updateChronometer, 10);
};

const jump = () => {
  mario.classList.add("jump");

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");

  if (pipePosition <= 70 && pipePosition > 0 && marioPosition < 50) {
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;
    mario.src = "./images/game-over.png";
    mario.style.width = "40px";
    mario.style.marginLeft = "40px";

    restart.style.display = "block";

    chronometer.style.color = "#ff0000";

    clearInterval(timerInterval);
  }
}, 10);

restart.onclick = function () {
  window.location.reload();
};

document.addEventListener("keydown", jump);
