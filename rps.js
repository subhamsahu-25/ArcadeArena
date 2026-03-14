const beats = {
  rock:     'scissors',
  scissors: 'paper',
  paper:    'rock'
}

const emoji = {
  rock:     '🪨',
  paper:    '📄',
  scissors: '✂️'
}

const choices = ['rock', 'paper', 'scissors']

let scores = { you: 0, cpu: 0, draw: 0 }

let roundNum = 0;
function play(playerChoice) {
  const cpuChoice = choices[Math.floor(Math.random() * 3)];

  document.getElementById('playerDisplay').textContent = emoji[playerChoice];
  document.getElementById('cpuDisplay').textContent = emoji[cpuChoice];

  if (playerChoice === cpuChoice) {
    scores.draw++;
    setStatus("It's a draw!");
  } else if (beats[playerChoice] === cpuChoice) {
    scores.you++;
    setStatus('You win this round! 🎉');
  } else {
    scores.cpu++;
    setStatus('CPU wins this round! 💀');
  }

  roundNum++;
  updateScores();

  if(roundNum==3) {
    if (scores.you > scores.cpu) {
      setStatus('You won the match! 🏆');
      disableButtons();
    } else if (scores.cpu > scores.you) {
      setStatus('CPU won the match! 💀');
      disableButtons();
    }
    else {
      setStatus('Maybe Play better than a robot? 😂🤣');
      disableButtons();
    }
  }
}

function disableButtons() {
  document.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = true);
}

function setStatus(msg) {
  document.getElementById('status').textContent = msg;
}

function updateScores() {
  document.getElementById('youScore').textContent = scores.you;
  document.getElementById('cpuScore').textContent = scores.cpu;
  document.getElementById('drawScore').textContent = scores.draw;
}

function fullReset() {
  document.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = false);
  scores = { you: 0, cpu: 0, draw: 0 };
  roundNum = 0;
  updateScores();
  document.getElementById('playerDisplay').textContent = '❓';
  document.getElementById('cpuDisplay').textContent = '❓';
  setStatus('Choose your move!');
}
