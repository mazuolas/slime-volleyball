import Court from './court.js';
import HumanPlayer from './human_player.js';
import ComputerPlayer from './computer_player.js';

const P1_POS = [200,853];
const P2_POS = [1080,853];

class Game {
  constructor(){
    this.court = null;
    this.gameOptions = {}
  }

  onePlayerGame() {
    this.gameOptions = {};
    this.gameOptions.player1 = new HumanPlayer({
      color: 'blue',
      pos: [200,853],
      jumpKey: 'w',
      leftKey: 'a',
      rightKey: 'd',
      maxLeft: 75,
      maxRight: 565
    });
    this.gameOptions.player2 = new ComputerPlayer({
      color: 'grey',
      pos: [1080,853],
      maxLeft: 725,
      maxRight: 1205
    });
    this.court = new Court(this.gameOptions, this.court);
  }

  twoPlayerGame() {
    this.gameOptions = {};
    this.gameOptions.player1 = new HumanPlayer({
      color: 'blue',
      pos: [200,853],
      jumpKey: 'w',
      leftKey: 'a',
      rightKey: 'd',
      maxLeft: 75,
      maxRight: 565
    });

    this.gameOptions.player2 = new HumanPlayer({
      color: 'green',
      pos: [1080,853],
      jumpKey: 'ArrowUp',
      leftKey: 'ArrowLeft',
      rightKey: 'ArrowRight',
      maxLeft: 725,
      maxRight: 1205
    });
    this.court = new Court(this.gameOptions, this.court);
  }
}

export default Game;
