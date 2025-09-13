let secretNumber, attempts;


function startGame() {
  secretNumber = Math.floor(Math.random() * 50) + 1;
  attempts = 0;
  updateAttempts();
  document.getElementById("feedback").innerText = "";
  document.getElementById("resetBtn").classList.add("hidden");
}


const updateAttempts = () => {
  document.getElementById("attempts").innerText = `Attempts: ${attempts}`;
};


const checkGuess = function () {
  const guess = parseInt(document.getElementById("guessInput").value);
  if (isNaN(guess)) return;

  attempts++;
  updateAttempts();

  if (guess === secretNumber) {
    document.getElementById("feedback").innerText = ` Correct! The number was ${secretNumber}.`;
    document.getElementById("resetBtn").classList.remove("hidden");
  } else if (guess < secretNumber) {
    document.getElementById("feedback").innerText = " Too low!";
  } else {
    document.getElementById("feedback").innerText = " Too high!";
  }
};


function onClick(id, handler) {
  document.getElementById(id).addEventListener("click", handler);
}

//  IIFE to start immediately
(function init() {
  startGame();
  onClick("guessBtn", checkGuess);
  onClick("resetBtn", startGame);
})();
