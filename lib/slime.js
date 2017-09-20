//entry file
import Game from './game.js';

document.addEventListener('DOMContentLoaded', () => {
  let canvas = document.getElementById('canvas');
  canvas.style.opacity = .5;

  const clearStart = (game) => () => {
    let welcome = document.getElementById('welcome');
    welcome.style.visibility = "hidden";
    canvas.style.opacity = 1;
    game(this.difficulty);
  }
  this.difficulty = 'easy';
  const setDifficulty = (diff) => () => {
    this.difficulty = diff
    if (diff == 'easy') {
      document.getElementById('easy-computer').className = 'selected';
      document.getElementById('hard-computer').className = '';
    } else{
      document.getElementById('easy-computer').className = '';
      document.getElementById('hard-computer').className = 'selected';
    }
  }
  let game = new Game();
  let onePlayer = document.getElementById('one-player');
  let twoPlayer = document.getElementById('two-player');
  let aiGame = document.getElementById('ai-game');
  let easy = document.getElementById('easy-computer');
  let hard = document.getElementById('hard-computer');
  let start = document.getElementById('start');
  easy.addEventListener('click', setDifficulty('easy'));
  hard.addEventListener('click', setDifficulty('hard'));
  onePlayer.addEventListener('click', game.onePlayerGame);
  twoPlayer.addEventListener('click', game.twoPlayerGame);
  aiGame.addEventListener('click', game.aiGame);
  start.addEventListener('click', clearStart(game.start))
});
