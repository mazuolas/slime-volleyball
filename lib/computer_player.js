const JUMP_VEL = -20;
const CANVAS_HEIGHT = 853;

class ComputerPlayer {
  constructor(options){
    this.pos = options.pos;
    this.vel = [0,0]
    this.color = options.color
    this.maxLeft = options.maxLeft;
    this.maxRight = options.maxRight;

    this.gfx = new createjs.Shape();
    this.gfx.graphics.beginFill(this.color).arc(0, 0, 75, Math.PI, 0)
    this.gfx.x = this.pos[0];
    this.gfx.y = this.pos[1];
  }

  left(){
    this.vel[0] = -10;
  }

  right(){
    this.vel[0] = 10;
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
    let yDiff = this.pos[1] - this.ball.pos[1];

    // 0 = y0 - 853 + vt + 0.5*at^2
    // a = .5 * .5 = .25
    // b = ball.val[1]
    // c = bal.pos[1] - 853
    let t = this.quadratic(0.25, this.ball.vel[1], (this.ball.pos[1] - 853))
    t = Math.floor(t);
    let landingPos = t*this.ball.vel[0] + this.ball.pos[0];
    landingPos = Math.abs(landingPos);
    if (landingPos > 1280) { landingPos = 2560 - landingPos ; }
    if(landingPos < this.maxRight+75 && landingPos > this.maxLeft-75){
      let xDiff = landingPos - this.pos[0];
      if (xDiff < -15){
        this.left();
      } else if(xDiff > 15){
        this.right();
      } else if(xDiff === 0){
        this.left();
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

  jump(){
    if (this.pos[1] === CANVAS_HEIGHT) {
      this.vel[1] = JUMP_VEL;
    }
  }

  fall(){
    if (this.pos[1] < CANVAS_HEIGHT ){
      this.vel[1] += 1;
    } else if(this.pos[1] > CANVAS_HEIGHT ){
      this.vel[1] = 0;
      this.pos[1] = CANVAS_HEIGHT;
    }
  }

  move(){
    if (this.pos[0] <= this.maxLeft && this.vel[0] < 0) {
      this.pos[0] = this.maxLeft;
    } else if (this.pos[0] >= this.maxRight && this.vel[0] > 0) {
      this.pos[0] = this.maxRight;
    } else{
      this.pos[0] += this.vel[0];
    }

    this.pos[1] += this.vel[1];
    this.gfx.x = this.pos[0];
    this.gfx.y = this.pos[1];
  }
}

export default ComputerPlayer;