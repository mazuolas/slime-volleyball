//entry file
import Game from './game.js';







document.addEventListener('DOMContentLoaded', () => {
  // let gameOptions = {};
  // // //human player 2

  //
  // // computer player 1
  // gameOptions.player1 = new ComputerPlayer({
  //   color: 'grey',
  //   pos: P1_POS,
  //   maxLeft: 75,
  //   maxRight: 565
  // });
  //
  // //comuter player 2
  // gameOptions.player2 = new ComputerPlayer({
  //   color: 'grey',
  //   pos: P2_POS,
  //   maxLeft: 725,
  //   maxRight: 1205
  // });
  let game = new Game();
  let onePlayer = document.getElementById('one-player');
  let twoPlayer = document.getElementById('two-player');
  onePlayer.addEventListener('click', game.onePlayerGame);
  twoPlayer.addEventListener('click', game.twoPlayerGame);
});
