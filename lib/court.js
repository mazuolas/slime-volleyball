import HumanPlayer from './human_player.js';

class Court {
  constructor(options = {}) {
    this.player1 = options.player1;
    this.player2 = options.player2;
    this.score = [0,0];
    this.stage = new createjs.Stage('canvas');
  }

  

};
