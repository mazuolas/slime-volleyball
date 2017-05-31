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

  tick(){
    this.act();
    this.move();
    this.fall();

  }

  act(){
    let xDiff = this.ball.pos[0] - this.pos[0];
    let yDiff = this.pos[1] - this.ball.pos[1];

    if (this.ball.pos[0] > this.maxLeft && this.ball.pos[0] < this.maxRight ){
      if (xDiff < -40){
        this.left();
      } else if(xDiff > 40){
        this.right();
      } else if(xDiff === 0){
        this.left();
      } else {
        this.vel[0] = 0;
      }
      if(yDiff < 200 && xDiff < 100){
        this.jump();
      }
    }

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
