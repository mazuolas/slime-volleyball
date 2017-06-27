const JUMP_VEL = -20;
const CANVAS_HEIGHT = 853;
import Player from './player.js';

class EasyComputerPlayer extends Player {
  constructor(options){
    super(options)
    this.gfx = new Image();
    if (this.maxRight > 1000) {
      this.gfx.src = 'img/easy_ai_right.png'
    } else{
      this.gfx.src = 'img/easy_ai_left.png'
    }
    this.gfx = new createjs.Bitmap(this.gfx);
    this.gfx.x = this.pos[0] - 75;
    this.gfx.y = this.pos[1] - 75;
    this.act = this.act.bind(this);
    this.tick = this.tick.bind(this);
  }

  center(){
    const middle = (this.maxLeft + this.maxRight)/2
    if ( (this.pos[0] - 11) > middle ){
      this.left();
    } else if ((this.pos[0] + 11) < middle){
      this.right();
    } else {
      this.vel[0] = 0
    }
  }

  tick(){
    this.act();
    this.move();
    this.fall();
  }

  act(){
    if (!this.ball) {
      return
    }

    let yDiff = this.pos[1] - this.ball.pos[1];
    //offset to ensure hitting ball in the direction of the net
    let offset = 30;
    if (this.maxRight > 1000) {
      offset = -30;
    }

    if(this.ball.pos[0] < this.maxRight+200 && this.ball.pos[0] > this.maxLeft-200){
      let xDiff = this.ball.pos[0] - this.pos[0] - offset;
      if (xDiff < -15){
        this.left();
      } else if(xDiff > 15){
        this.right();
      } else {
        this.vel[0] = 0;
      }
      if(yDiff < 200 && Math.abs(this.ball.pos[0] - this.pos[0]) < 100){
        this.jump();
      }
    } else {
      this.center();
    }

  }
}

export default EasyComputerPlayer;
