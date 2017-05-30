import HumanPlayer from './human_player.js';

class Court {
  constructor(options = {}) {
    this.player1 = options.player1;
    this.player2 = options.player2;
    this.score = [0,0];
    this.stage = new createjs.Stage('canvas');

    this.bg = new Image();
    this.bg.src = 'img/background.jpg';
    this.bg.onload = this.setup.bind(this);
    document.addEventListener('keydown', (e)=> this.handleKeyDown(e) )
    document.addEventListener('keyup', (e)=> this.handleKeyUp(e) )
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
    let circle = new createjs.Shape()
    circle.graphics.beginFill("red").drawCircle(0, 0, 20);
    circle.x = 100;
    circle.y = 600;
    this.stage.update();
    createjs.Ticker.setFPS(60);
    let vel = 5;
    this.stage.addChild(circle);
    //players
    this.stage.addChild(this.player1.gfx);
    this.stage.addChild(this.player2.gfx);

    //ticker
    createjs.Ticker.addEventListener('tick', () => {
      if ((circle.x > this.stage.canvas.width && vel > 0) || (circle.x < 0 && vel < 0)) {
        vel = vel * -1;
      }
      circle.x += vel;
      this.player1.move();
      this.player1.fall();
      this.player2.move();
      this.player2.fall()
      this.stage.update();
    })
    this.stage.update();
  }


  handleKeyDown(e){
    console.log(e.key+ ' down');
    switch(e.key){
      case(this.player1.jumpKey):
        this.player1.jump();
        break;
      case(this.player2.jumpKey):
        this.player2.jump();
        break;
      case(this.player1.leftKey):
        this.player1.vel[0] = -10;
        break;
      case(this.player1.rightKey):
        this.player1.vel[0] = 10;
        break;
      case(this.player2.leftKey):
        this.player2.vel[0] = -10;
        break;
      case(this.player2.rightKey):
        this.player2.vel[0] = 10;
        break;
    }
  }
  handleKeyUp(e){
    console.log(e.key + ' up');
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
