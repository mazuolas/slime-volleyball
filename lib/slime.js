//entry file
import Court from './court.js';
import HumanPlayer from './human_player.js';

document.addEventListener('DOMContentLoaded', () => {
  let courtOptions = {};
  courtOptions.player1 = new HumanPlayer({
    color: 'blue',
    pos: [200, 853],
    jumpKey: 'w',
    leftKey: 'a',
    rightKey: 'd',
    maxLeft: 75,
    maxRight: 565
  });

  courtOptions.player2 = new HumanPlayer({
    color: 'green',
    pos: [1080, 853],
    jumpKey: 'ArrowUp',
    leftKey: 'ArrowLeft',
    rightKey: 'ArrowRight',
    maxLeft: 725,
    maxRight: 1205
  });

  let court = new Court(courtOptions);
});
