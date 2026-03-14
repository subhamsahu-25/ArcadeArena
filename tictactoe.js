let boardVal    = Array(9).fill(null);  
let curr  = 'X';                
let gameOver = false;               
let scores   = { X: 0, O: 0, D: 0 }; 

const winpos = [
  [0,1,2],[3,4,5],[6,7,8], 
  [0,3,6],[1,4,7],[2,5,8],  
  [0,4,8],[2,4,6]           
];

function render() {
  const boardElem = document.getElementById('board');
  boardElem.innerHTML = '';

  boardVal.forEach((val, i) => {
    const cell = document.createElement('div');

    cell.className = 'cell' + (val ? ` ${val.toLowerCase()} taken` : '');
    cell.textContent = val || '';
    cell.onclick = () => handleClick(i);

    boardElem.appendChild(cell);
  });
}

function handleClick(i) {
  if (gameOver || boardVal[i]) return;

  boardVal[i] = curr;
  render();

  const winLine = winpos.find(([a, b, c]) =>
    boardVal[a] && boardVal[a] === boardVal[b] && boardVal[b] === boardVal[c]
  );

  if (winLine) {
    document.querySelectorAll('.cell').forEach((elem, i) => {
      if (winLine.includes(i)) elem.classList.add('winner');
    });
    scores[curr]++;
    updateScores();
    setStatus(`${curr} wins! 🎉`);
    gameOver = true;

  } else if (boardVal.every(c => c)) {
    scores.D++;
    updateScores();
    setStatus("It's a draw!");
    gameOver = true;

  } else {
    curr = curr === 'X' ? 'O' : 'X';
    setStatus(`${curr}'s turn`);
    updateActivePanels();
  }
}

function setStatus(msg) {
  document.getElementById('status').textContent = msg;
}

function updateScores() {
  document.getElementById('xScore').textContent = scores.X;
  document.getElementById('oScore').textContent = scores.O;
  document.getElementById('dScore').textContent = scores.D;
}

function updateActivePanels() {
  document.getElementById('xBox').classList.toggle('active-x', curr === 'X');
  document.getElementById('oBox').classList.toggle('active-o', curr === 'O');
}

function playAgain() {
  boardVal    = Array(9).fill(null);
  curr  = 'X';
  gameOver = false;
  render();
  setStatus("X's turn");
  updateActivePanels();
}

function fullReset() {
  scores = { X: 0, O: 0, D: 0 };
  updateScores();
  playAgain();
}

render();
