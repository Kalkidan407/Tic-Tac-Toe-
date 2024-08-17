const GameBoard = (() => {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let X_btn = document.querySelector(".X_btn");
  let Y_btn = document.querySelector(".Y_btn");

  X_btn.style.display = "block";
  Y_btn.style.display = "block";
  let select = ["X", "O"];
  let currentPlayer;

  X_btn.addEventListener("click", () => {
    currentPlayer = select[0];
  });

  Y_btn.addEventListener("click", () => {
    currentPlayer = select[1];
  });

  const resetBoard = () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""];

    render();
  };
  const resetGame = () => {
    resetBoard();
    document.getElementById("overlay").remove();
  };

  const autoFill = (currentPlayer) => {
    let nextEmptyIndex = gameBoard.findIndex((square) => square === "");
    if (nextEmptyIndex !== -1) {
      let autoPlayer = currentPlayer === "X" ? "O" : "X";
      gameBoard[nextEmptyIndex] = autoPlayer;
      render();

      if (checkWinner(gameBoard, autoPlayer)) {
        gameOver(autoPlayer);
      }
    }
  };

  const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (gameBoard, currentPlayer) => {
    for (let combo of winningCombination) {
      const [a, b, c] = combo;
      if (
        gameBoard[a] === currentPlayer &&
        gameBoard[b] === currentPlayer &&
        gameBoard[c] === currentPlayer
      ) {
        return true;
      }
    }
    return false;
  };

  const gameOver = (currentPlayer) => {
    let message = `<div id="overlay" >
    <div class= "messWrapper"> 
  <p class="paraOne">Game over</p>
           
      <p class="para">${currentPlayer} Wins! 🎉</p>
      <button class="reset" type="button">Play again </button>
    </div>  </div>`;
    document.body.innerHTML += message;

    document.querySelector(".reset").addEventListener("click", () => {
      location.reload();
      resetGame();
    });
  };

  const render = () => {
    let boardHTML = "";
    gameBoard.forEach((square, index) => {
      boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
    });
    document.querySelector(".gameBoard").innerHTML = boardHTML;

    document.querySelectorAll(".square").forEach((square, index) => {
      square.addEventListener("click", () => {
        if (!gameBoard[index]) {
          gameBoard[index] = currentPlayer;
          render();
          autoFill(currentPlayer);
        }
        if (checkWinner(gameBoard, currentPlayer)) {
          {
            gameOver(currentPlayer);
          }
        }
      });
    });
  };
  return {
    render,
  };
})();

//------- ----- -----   -----    --------   -------- ---- //

GameBoard.render();
