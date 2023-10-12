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
let timer = 0;
let timerInterval;

function updateTimer() {
  const minutes = Math.floor(timer / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timer % 60).toString().padStart(2, "0");
  const timerElement = document.querySelector(".timer");
  timerElement.textContent = `${minutes}:${seconds}`;
  timer++;
}

updateTimer();
