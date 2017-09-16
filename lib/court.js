import HumanPlayer from './human_player.js';
import Ball from './ball.js';

class Court {
  constructor(options, oldCourt) {
    this.player1 = options.player1;
    this.player2 = options.player2;
    this.score = [0,0];
    this.stage = new createjs.Stage('canvas');

    this.bg = new Image();
    this.bg.src = 'img/background.jpg';
    const ballOptions = {
      pos: [200, 600],
      p1: this.player1,
      p2: this.player2
    }
    this.ball = new Ball(ballOptions);
    this.bg.onload = this.setup.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    if (oldCourt) {
      createjs.Ticker.removeAllEventListeners('tick')
      document.removeEventListener('keydown', oldCourt.handleKeyDown )
      document.removeEventListener('keyup', oldCourt.handleKeyUp )
    }
    document.addEventListener('keydown', this.handleKeyDown )
    document.addEventListener('keyup', this.handleKeyUp )
  }

  setup(e){
    //background
    this.stage.addChild(new createjs.Bitmap(this.bg))

    //net
    let net = new createjs.Shape();
    net.graphics.beginFill('black').drawRect(0, 0, 10, 100);
    net.x = this.stage.canvas.width/2;
    net.y = this.stage.canvas.height - 100;
    this.stage.addChild(net);

    //ball

    this.stage.addChild(this.ball.gfx);
    this.player1.ball = this.ball;
    this.player2.ball = this.ball;
    //players
    this.stage.addChild(this.player1.gfx);
    this.stage.addChild(this.player2.gfx);

    //score

    this.stage.update();
  }

  startTicker(){
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', () => {
      this.ball.tick();
      this.player1.tick();
      this.player2.tick();
      if (this.ball.pos[1] > 853) {
        this.gameOver()
      }
      this.stage.update();
    })
  }

  gameOver(){
    createjs.Ticker.removeAllEventListeners('tick');
    let endGameText = 'Player 1 Wins!'
    let ballStart = [200, 600]
    if (this.ball.pos[0] < 640) {
      endGameText = 'Player 2 Wins!'
      ballStart = [1080, 600]
      this.score[1] += 1
    } else {
      this.score[0] += 1
    }
    this.endGameText = new createjs.Text(endGameText);
    this.endGameText.textAlign = 'center'
    this.endGameText.x = 640;
    this.endGameText.y = 400;
    this.endGameText.color = 'red';
    this.endGameText.font = 'normal 80px Coiny';
    this.stage.addChild(this.endGameText);

    this.p1score = new createjs.Text("o".repeat(this.score[0]));
    this.p1score.x = 100;
    this.p1score.color = 'red'
    this.p1score.font = 'bold 40px Coiny'
    this.p2score = new createjs.Text("o".repeat(this.score[1]));
    this.p2score.x = 1000;
    this.p2score.color = 'red'
    this.p2score.font = 'bold 40px Coiny'
    this.stage.addChild(this.p1score)
    this.stage.addChild(this.p2score)
    if (this.score[0] == 5 || this.score[1] == 5 ) {
      setTimeout(() => this.restart(ballStart), 3000)
    }
  }

  restart(ballPos){
    this.stage.removeChild(this.endGameText)
    this.ball.reset(ballPos);
    this.player1.reset();
    this.player2.reset();
    this.startTicker();
  }

  handleKeyDown(e){
    switch(e.key){
      case(this.player1.jumpKey):
        this.player1.jump();
        break;
      case(this.player2.jumpKey):
        this.player2.jump();
        break;
      case(this.player1.leftKey):
        this.player1.left();
        break;
      case(this.player1.rightKey):
        this.player1.right();
        break;
      case(this.player2.leftKey):
        this.player2.left();
        break;
      case(this.player2.rightKey):
        this.player2.right();
        break;
    }
  }
  handleKeyUp(e){
    switch(e.key){
      case(this.player1.leftKey):
        this.player1.vel[0] = 0;
        break;
      case(this.player1.rightKey):
        this.player1.vel[0] = 0;
        break;
      case(this.player2.leftKey):
        this.player2.vel[0] = 0;
        break;
      case(this.player2.rightKey):
        this.player2.vel[0] = 0;
        break;
    }
  }
};


export default Court;
