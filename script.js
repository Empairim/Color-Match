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
// let timer = 10;
// const timerInterval = setInterval(updateTimer, 1000);

// function updateTimer() {
//   const minutes = Math.floor(timer / 60)
//     .toString()
//     .padStart(2, "0");
//   const seconds = (timer % 60).toString().padStart(2, "0");
//   const timerElement = document.querySelector(".timer");
//   timerElement.textContent = `${minutes}:${seconds}`;
//   timer--;

//   if (timer >= 0) {
//     flood();
//   }

//   if (timer < 0) {
//     clearInterval(timerInterval);
//     const clickableElements = document.querySelectorAll(".clickable");
//     clickableElements.forEach((element) => {
//       element.disabled = true;
//     });
//     return;
//   }
// }

//creating the rain effect
// function toggleRain() {
//   const body = document.querySelector("body");
//   body.classList.toggle("rain");
// }
//creating flood effect
// function flood() {
//   {
//     const body = document.querySelector("body");
//     body.classList.add("water");
//   }
// }

function restartGame() {
  location.reload();
}

function winAnimation() {
  const gameBoard = document.querySelector(".game-board");
  gameBoard.classList.add("win");
}

let timerInterval;

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
  let selectedIndices = []; //empty array to keep track of game baord
  let matchedPairs = 0; //inits the match pairs number to keep track so when all is matched game ends
  for (let i = 0; i < pairs.length; i++) {
    const card = document.createElement("div");
    card.classList.add("font-option");
    card.dataset.font = pairs[i]; //sets the data set with the name "font" to whatever is at pairs index
    card.textContent = pairs[i]; //same as above but for its content
    gameBoard.appendChild(card); //this adds the card to the game baord

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
          //   console.log("matchedPairs:", matchedPairs);
          //   console.log("fontOptions.length:", fontOptions.length);
          //TESTING ^
          // if (matchedPairs === pairs.length / 2) {
          //   console.log("matchedPairs:", matchedPairs);
          //   console.log("fontOptions.length:", fontOptions.length);
          //   // Game over
          //   clearInterval(timerInterval);
          //   //when all the pairs are matched Ill add a better win animation later
          //   //add restart
          //   alert("Congratulations! You won!");
          if (matchedPairs === pairs.length / 2) {
            clearInterval(timerInterval);
            // winAnimation();
            const restart = confirm(
              "Congratulations! You won!\n\nDo you want to play again?"
            );
            if (restart) {
              restartGame();
            } else {
              document.querySelector(".game-board").remove(); // Remove the game board from the page cause looks crappy otherwise
            }
          }
        } else {
          // Unselect the elements after a short delay if nothing happens i.e. pair didnt match

          setTimeout(() => {
            const selectedElements = document.querySelectorAll(".selected");
            selectedElements.forEach((element) => {
              element.dataset.selected = "false";
              element.classList.remove("selected");
              // element.class.add("shake");
            });
            selectedIndices = [];
          }, 500);
        }
      }
    });
  }
}

createGameBoard();
