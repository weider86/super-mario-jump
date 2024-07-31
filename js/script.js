let timerInterval;

window.onload = function () {
  const display = document.querySelector(".chronometer");
  let startTime = Date.now();

  function updateChronometer() {
    let elapsedTime = Date.now() - startTime;
    // let minutes = Math.floor(elapsedTime / 60000);
    let seconds = Math.floor((elapsedTime % 60000) / 1000);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    // minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;

    display.textContent = `${seconds}.${milliseconds}`;
  }

  timerInterval = setInterval(updateChronometer, 10);
};

const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");

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

    clearInterval(timerInterval);
  }
}, 10);

document.addEventListener("keydown", jump);
