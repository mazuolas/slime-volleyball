//entry file
import Court from './court.js';
import HumanPlayer from './human_player.js';

document.addEventListener('DOMContentLoaded', () => {
  let courtOptions = {};
  courtOptions.player1 = new HumanPlayer({
    color: 'blue',
    pos: [200, 853],
  });

  courtOptions.player2 = new HumanPlayer({
    color: 'green',
    pos: [1080, 853],
  });

  let court = new Court(courtOptions);
});
