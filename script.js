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

function createGameBoard() {
  // Duplicate each element in the fontOptions array to create pairs
  const pairs = [...fontOptions, ...fontOptions];

  // Shuffling the pairs array like with game of war
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }

  // Create the game board
  const gameBoard = document.querySelector(".game-board");
  let selectedIndices = [];
  let matchedPairs = 0;
  for (let i = 0; i < pairs.length; i++) {
    const card = document.createElement("div");
    card.classList.add("font-option");
    card.dataset.font = pairs[i];
    card.textContent = pairs[i];
    gameBoard.appendChild(card);

    // Add click event listener to each font-option element
    card.addEventListener("click", function () {
      // Check if the font-option element is already selected
      if (card.dataset.selected === "true") {
        return;
      }

      // Add the index of the font-option element to the selected indices array
      selectedIndices.push(fontOptions.indexOf(card.dataset.font));
      card.dataset.selected = "true";
      card.classList.add("selected");

      // Check if two elements are selected
      if (selectedIndices.length === 2) {
        // Check if the selected elements match
        if (selectedIndices[0] === selectedIndices[1]) {
          // Remove the matched elements from the game board
          const indexToRemove = selectedIndices[0];
          fontOptions.splice(indexToRemove, 2);
          selectedIndices = [];
          matchedPairs++;

          // Remove the matched elements from the game board
          const selectedElements = document.querySelectorAll(".selected");
          selectedElements.forEach((element) => element.remove());

          // Check if all pairs have been matched
          if (matchedPairs === fontOptions.length / 2) {
            // Game over
            clearInterval(timerInterval);
            alert("Congratulations! You won!");
          }
        } else {
          // Unselect the elements after a short delay
          setTimeout(() => {
            const selectedElements = document.querySelectorAll(".selected");
            selectedElements.forEach((element) => {
              element.dataset.selected = "false";
              element.classList.remove("selected");
            });
            selectedIndices = [];
          }, 1000);
        }
      }
    });
  }
}

createGameBoard();
