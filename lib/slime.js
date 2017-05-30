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
  });

  courtOptions.player2 = new HumanPlayer({
    color: 'green',
    pos: [1080, 853],
    jumpKey: 'ArrowUp',
    leftKey: 'ArrowLeft',
    rightKey: 'ArrowRight',
  });

  let court = new Court(courtOptions);
});
