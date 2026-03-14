document.addEventListener("DOMContentLoaded", () => {
  let position
  let systemTimer
  let gameOver

  const TOTAL_STEPS = 10
  let SYSTEM_DELAY
  const tapBtn = document.getElementById('tapBtn');
  const resetBtn = document.querySelector(".reset-btn");
  tapBtn.addEventListener('click', movePlayer);
  resetBtn.addEventListener('click', initGame);


  function initGame() {
    SYSTEM_DELAY = document.querySelector(".difficulty").value;
    position = 5;
    gameOver = false;
    cancelSystemMove();
    document.getElementById('tapBtn').disabled = false;
    updateTrack();
  }

  function movePlayer() {
    if (gameOver) return;

    cancelSystemMove();
    position++;
    updateTrack();
    checkWin();
    scheduleSystemMove();
  }

  function moveSystem() {
    if (gameOver) return;

    position--;
    updateTrack();
    checkWin();

    scheduleSystemMove();
  }

  function scheduleSystemMove() {
    if (gameOver) return;

    systemTimer = setTimeout(moveSystem, SYSTEM_DELAY);
  }

  function cancelSystemMove() {
    clearTimeout(systemTimer);
  }

  function updateTrack() {
    const percent = (position / TOTAL_STEPS) * 100;
    document.getElementById('character').style.left = percent + '%';
  }

  function checkWin() {
    if (position >= TOTAL_STEPS) endGame('player');
    else if (position <= 0) endGame('system');
  }

  function endGame(winner) {
    gameOver = true;
    cancelSystemMove();
    document.getElementById('tapBtn').disabled = true;

    const msg = winner === 'player' ? 'You Win! 🏆' : 'System Wins! ⚡';
    document.getElementById('status').textContent = msg
  }

  initGame();

});