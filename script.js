document.addEventListener("DOMContentLoaded", () => {
  const game = document.getElementById("game");
  const statusText = document.getElementById("status");
  const resultScreen = document.getElementById("resultScreen");
  const resultText = document.getElementById("resultText");
  const newGameBtn = document.getElementById("newGameBtn");

  let currentPlayer = "X";
  let board = Array(9).fill("");
  let gameActive = true;

  function createBoard() {
    game.innerHTML = "";
    board.forEach((cell, index) => {
      const div = document.createElement("div");
      div.classList.add("cell");
      div.dataset.index = index;
      div.innerText = cell;
      div.addEventListener("click", handleMove);
      game.appendChild(div);
    });
  }

  function handleMove(e) {
    const index = e.target.dataset.index;
    if (!gameActive || board[index] !== "") return;

    board[index] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (checkWin()) {
      showResult(`Player ${currentPlayer} wins! 🎉`);
      gameActive = false;
    } else if (board.every(cell => cell !== "")) {
      showResult("It's a draw! 🤝");
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusText.innerText = `Player ${currentPlayer}'s turn`;
    }
  }

  function checkWin() {
    const winPatterns = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    return winPatterns.some(pattern => {
      const [a, b, c] = pattern;
      return board[a] && board[a] === board[b] && board[b] === board[c];
    });
  }

  function showResult(message) {
    resultText.innerText = message;
    resultScreen.style.display = "flex";
  }

  function resetGame() {
    board = Array(9).fill("");
    currentPlayer = "X";
    gameActive = true;
    statusText.innerText = `Player ${currentPlayer}'s turn`;
    resultScreen.style.display = "none";
    createBoard();
  }

  newGameBtn.addEventListener("click", resetGame);

  createBoard();
});
