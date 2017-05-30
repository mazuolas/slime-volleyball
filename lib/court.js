import HumanPlayer from './human_player.js';

class Court {
  constructor(options = {}) {
    this.player1 = options.player1;
    this.player2 = options.player2;
    this.score = [0,0];
    this.stage = new createjs.Stage('canvas');

    let bg = new Image();
    bg.src = 'img/background.jpg';
    bg.onload = (e) => {
      this.stage.addChild(new createjs.Bitmap(bg))
      this.stage.addChild(circle);
      this.stage.addChild(this.player1.gfx);
      this.stage.addChild(this.player2.gfx);
      this.stage.addChild(net);
      this.stage.update();
    };

    let circle = new createjs.Shape()
    circle.graphics.beginFill("red").drawCircle(0, 0, 20);
    circle.x = 100;
    circle.y = 600;
    this.stage.update();
    createjs.Ticker.setFPS(60);
    let vel = 5;
    createjs.Ticker.addEventListener('tick', () => {
      if ((circle.x > this.stage.canvas.width && vel > 0) || (circle.x < 0 && vel < 0)) {
         vel = vel * -1;
       }
      circle.x += vel;
      this.stage.update();
    })

    let net = new createjs.Shape();
    net.graphics.beginFill('black').drawRect(0, 0, 10, 100);
    net.x = this.stage.canvas.width/2;
    net.y = this.stage.canvas.height - 100;
  }

  setup(){

  }



};


export default Court;
