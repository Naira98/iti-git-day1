let currentPlayer = "X";
let isPlaying = true;
const endMessage = document.createElement("h2");
const playerTurnElement = document.getElementById("playerTurn");
const turnResultElement = document.querySelector('.turn-result');
const resetBtn = document.querySelector(".reset-btn");
const squares = document.querySelectorAll(".square");
const winningChances = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


for (let i = 0; i < squares.length; i++) {
  playerTurnElement.style.display = "block";
  playerTurnElement.classList.add("blue");
  playerTurnElement.classList.remove("red");
  playerTurnElement.textContent = `Turn: ${currentPlayer}`;
  squares[i].addEventListener("click", () => {
    if (isPlaying) {
      if (squares[i].textContent !== "") {
        return;
      }
      if (currentPlayer === "X") {
        squares[i].classList.add("blue");
        squares[i].classList.remove("red");
        playerTurnElement.classList.add("red");
        playerTurnElement.classList.remove("blue");
      } else {
        squares[i].classList.add("red");
        squares[i].classList.remove("blue");
        playerTurnElement.classList.add("blue");
        playerTurnElement.classList.remove("red");
      }
      playerTurnElement.style.display = "block";
      endMessage.style.display = "none";
      squares[i].textContent = currentPlayer;
      if (checkWin()) {
        endMessage.textContent = `${currentPlayer} wins 🎉`;
        endMessage.classList.add("result-win");
        endMessage.classList.remove("result-tie");
        turnResultElement.appendChild(endMessage);
        // document.body.insertBefore(endMessage, resetBtn);
        playerTurnElement.style.display = "none";
        endMessage.style.display = "block";
        isPlaying = false;
      }
      if (checkTie()) {
        endMessage.textContent = `Game Over! It's a Tie 🤜🤛`;
        endMessage.classList.add("result-tie");
        endMessage.classList.remove("result-win");
        turnResultElement.appendChild(endMessage);
        playerTurnElement.style.display = "none";
        endMessage.style.display = "block";
      }
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      playerTurnElement.textContent = `Turn: ${currentPlayer}`;
    }
  });
}

function checkWin() {
  for (let i = 0; i < winningChances.length; i++) {
    const [a, b, c] = winningChances[i];
    if (
      squares[a].textContent === currentPlayer &&
      squares[b].textContent === currentPlayer &&
      squares[c].textContent === currentPlayer
    ) {
      return true;
    }
  }
  return false;
}

function checkTie() {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].textContent === "") {
      return false;
    }
  }
  return true;
}

resetBtn.addEventListener("click", () => {
  for (let i = 0; i < squares.length; i++) {
    squares[i].textContent = "";
    endMessage.style.display = "none";
    isPlaying = true;
    currentPlayer = "X";
    playerTurnElement.style.display = "block";
    playerTurnElement.classList.add("blue");
    playerTurnElement.classList.remove("red");
    playerTurnElement.textContent = `Turn: ${currentPlayer}`;
  }
});
