const fontOptions = [
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🐻",
  "🐼",
  "🐷",
  "🐸",
  "🐵",
  "🐘",
  "🦏",
  "🦛",
  "🐨",
  "🐯",
  "🦁",
  "🐮",
  "🐔",
  "🐤",
];

//timer logic
let timer = 60;
const timerInterval = setInterval(updateTimer, 1000);

function updateTimer() {
  const minutes = Math.floor(timer / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timer % 60).toString().padStart(2, "0");
  const timerElement = document.querySelector(".timer");
  timerElement.textContent = `${minutes}:${seconds}`;
  timer--;

  if (timer >= 0) {
    toggleRain();
  }
  if (timer === 0) {
    clearInterval(timerInterval);
  }
}

//creating the rain effect
function toggleRain() {
  const body = document.querySelector("body");
  body.classList.toggle("rain");
}
