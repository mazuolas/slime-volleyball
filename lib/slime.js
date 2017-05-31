//entry file
import Court from './court.js';
import HumanPlayer from './human_player.js';
import ComputerPlayer from './computer_player.js';

const P1_POS = [200,853];
const P2_POS = [1080,853];

document.addEventListener('DOMContentLoaded', () => {
  let courtOptions = {};
  // courtOptions.player1 = new HumanPlayer({
  //   color: 'blue',
  //   pos: P1_POS,
  //   jumpKey: 'w',
  //   leftKey: 'a',
  //   rightKey: 'd',
  //   maxLeft: 75,
  //   maxRight: 565
  // });
  //
  // //human player 2
  // courtOptions.player2 = new HumanPlayer({
  //   color: 'green',
  //   pos: P2_POS,
  //   jumpKey: 'ArrowUp',
  //   leftKey: 'ArrowLeft',
  //   rightKey: 'ArrowRight',
  //   maxLeft: 725,
  //   maxRight: 1205
  // });

  // computer player 1
  courtOptions.player1 = new ComputerPlayer({
    color: 'grey',
    pos: P1_POS,
    maxLeft: 75,
    maxRight: 565
  });

  //comuter player 2
  courtOptions.player2 = new ComputerPlayer({
    color: 'grey',
    pos: P2_POS,
    maxLeft: 725,
    maxRight: 1205
  });

  let court = new Court(courtOptions);
});
