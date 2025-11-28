/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const resetBtn = document.getElementById('reset');

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(sqr => {
  sqr.addEventListener('click', handleClick);
});

resetBtn.addEventListener('click', init);

/*-------------------------------- Functions --------------------------------*/
init();

function init() {
  board = [null, null, null, null, null, null, null, null, null];
  turn = 'X';
  winner = null;
  render();
}

function render() {
  renderBoard();
  renderMessage();
}

function renderBoard() {
  board.forEach((value, index) => {
    document.getElementById(index.toString()).textContent = value ? value : '';
  });
}

function renderMessage() {
  if (!winner) {
    messageEl.textContent = `It's ${turn}'s turn`;
  } else if (winner === 'T') {
    messageEl.textContent = `It's a tie!`;
  } else {
    messageEl.textContent = `${winner} wins!`;
  }
}

function handleClick(evt) {
  const squareIndex = parseInt(evt.target.id);
  if (winner) return;
  if (board[squareIndex] !== null) return;
  board[squareIndex] = turn;
  checkForWinner();
  checkForTie();
  if (!winner) turn = turn === 'X' ? 'O' : 'X';
  render();
}

function checkForWinner() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a];
      return;
    }
  }
}

function checkForTie() {
  if (winner) return;
  if (board.every(cell => cell !== null)) winner = 'T';
}