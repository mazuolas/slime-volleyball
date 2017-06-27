import Court from './court.js';
import HumanPlayer from './human_player.js';
import ComputerPlayer from './computer_player.js';
import EasyComputerPlayer from './easy_computer.js';

const P1_POS = [200,853];
const P2_POS = [1080,853];

class Game {
  constructor(){
    this.court = null;
    this.gameOptions = {}
    this.aiGame();
    this.onePlayerGame = this.onePlayerGame.bind(this);
    this.twoPlayerGame = this.twoPlayerGame.bind(this);
    this.aiGame = this.aiGame.bind(this);
  }

  onePlayerGame(difficulty) {
    this.gameOptions = {};
    this.gameOptions.player1 = new HumanPlayer({
      color: 'green',
      pos: [200,853],
      jumpKey: 'w',
      leftKey: 'a',
      rightKey: 'd',
      maxLeft: 75,
      maxRight: 565
    });
    if (difficulty === 'hard') {
      this.gameOptions.player2 = new ComputerPlayer({
        color: 'grey',
        pos: [1080,853],
        maxLeft: 725,
        maxRight: 1205
      });
    } else {
      this.gameOptions.player2 = new EasyComputerPlayer({
        color: 'grey',
        pos: [1080,853],
        maxLeft: 725,
        maxRight: 1205
      });
    }
    document.getElementById('one-player').className = 'selected';
    document.getElementById('two-player').className = '';
    document.getElementById('ai-game').className = '';
    document.getElementById('p1-controls').style.visibility = 'visible';
    document.getElementById('p2-controls').style.visibility = 'hidden';
    this.court = new Court(this.gameOptions, this.court);
    this.court.startTicker();
  }

  twoPlayerGame() {
    this.gameOptions = {};
    this.gameOptions.player1 = new HumanPlayer({
      color: 'green',
      pos: [200,853],
      jumpKey: 'w',
      leftKey: 'a',
      rightKey: 'd',
      maxLeft: 75,
      maxRight: 565
    });

    this.gameOptions.player2 = new HumanPlayer({
      color: 'blue',
      pos: [1080,853],
      jumpKey: 'ArrowUp',
      leftKey: 'ArrowLeft',
      rightKey: 'ArrowRight',
      maxLeft: 725,
      maxRight: 1205
    });
    document.getElementById('one-player').className = '';
    document.getElementById('two-player').className = 'selected';
    document.getElementById('ai-game').className = '';
    document.getElementById('p1-controls').style.visibility= 'visible';
    document.getElementById('p2-controls').style.visibility = 'visible';
    this.court = new Court(this.gameOptions, this.court);
    this.court.startTicker();
  }

  aiGame() {
    this.gameOptions = {};
    this.gameOptions.player1 = new ComputerPlayer({
      color: 'grey',
      pos: [1080,853],
      maxLeft: 725,
      maxRight: 1205
    });

    this.gameOptions.player2 = new EasyComputerPlayer({
      color: 'grey',
      pos: [200,853],
      maxLeft: 75,
      maxRight: 565
    });
    document.getElementById('one-player').className = '';
    document.getElementById('two-player').className = '';
    document.getElementById('ai-game').className = 'selected';
    document.getElementById('p1-controls').style.visibility = 'hidden';
    document.getElementById('p2-controls').style.visibility = 'hidden';
    this.court = new Court(this.gameOptions, this.court);
    this.court.startTicker();
  }
}

export default Game;
