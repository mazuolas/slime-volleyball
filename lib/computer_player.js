const JUMP_VEL = -20;
const CANVAS_HEIGHT = 853;
import Player from './player.js'

class ComputerPlayer extends Player {
  constructor(options){
    super(options)
    // this.gfx = new createjs.Shape();
    // this.gfx.graphics.beginFill(this.color).arc(0, 0, 75, Math.PI, 0)
    this.gfx = new Image();
    if (this.maxRight > 1000) {
      this.gfx.src = 'img/right_evil_ai.png'
    } else{
      this.gfx.src = 'img/evil_ai2.png'
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
    let offset = 50;
    if (this.maxRight > 1000) {
      offset = -50;
    }
    // 0 = y0 - 853 + vt + 0.5*at^2
    // a = .5 * .5 = .25
    // b = ball.val[1]
    // c = bal.pos[1] - 853

    //time in frames until ball hits the ground
    let t = this.quadratic(0.25, this.ball.vel[1], (this.ball.pos[1] - 853))
    t = Math.floor(t);

    //calculate landing x position and account for wall bounces
    let landingPos = t*this.ball.vel[0] + this.ball.pos[0];
    landingPos = Math.abs(landingPos);
    if (landingPos > 1280) { landingPos = 2560 - landingPos ; }

    if(landingPos < this.maxRight+200 && landingPos > this.maxLeft-200){
      let xDiff = landingPos - this.pos[0] - offset;
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

  quadratic(a,b,c){
    //positive quadratic solution
    return (-1 * b + Math.sqrt(b*b - 4*a*c))/(2*a);
  }
}

export default ComputerPlayer;
