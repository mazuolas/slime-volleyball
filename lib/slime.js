//entry file
import Game from './game.js';

document.addEventListener('DOMContentLoaded', () => {
  let canvas = document.getElementById('canvas');
  canvas.style.opacity = .5;

  const clearStart = (game) => () => {
    let welcome = document.getElementById('welcome');
    welcome.style.visibility = "hidden";
    canvas.style.opacity = 1;
    game();
  }
  let game = new Game();
  let onePlayer = document.getElementById('one-player');
  let twoPlayer = document.getElementById('two-player');
  let aiGame = document.getElementById('ai-game');
  onePlayer.addEventListener('click', clearStart(game.onePlayerGame));
  twoPlayer.addEventListener('click', clearStart(game.twoPlayerGame));
  aiGame.addEventListener('click', clearStart(game.aiGame));
});
