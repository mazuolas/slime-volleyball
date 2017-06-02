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
    // let p1score = new createjs.Text(this.score[0]);
    // p1score.x = 100;
    // let p2score = new createjs.Text(this.score[1]);
    // p2score.x = 1000;
    // this.stage.addChild(p1score)
    // this.stage.addChild(p2score)

    this.stage.update();
  }

  startTicker(){
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', () => {
      this.ball.tick();
      this.player1.tick();
      this.player2.tick();
      this.stage.update();
    })
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
