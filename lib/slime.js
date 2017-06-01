//entry file
import Game from './game.js';

document.addEventListener('DOMContentLoaded', () => {

  let game = new Game();
  let onePlayer = document.getElementById('one-player');
  let twoPlayer = document.getElementById('two-player');
  let aiGame = document.getElementById('ai-game');
  onePlayer.addEventListener('click', game.onePlayerGame);
  twoPlayer.addEventListener('click', game.twoPlayerGame);
  aiGame.addEventListener('click', game.aiGame);
});
