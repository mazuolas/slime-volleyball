const JUMP_VEL = -20;
const CANVAS_HEIGHT = 853;

class Player {
  constructor(options){
    this.pos = options.pos;
    this.startPos = options.pos
    this.vel = [0,0]
    this.color = options.color
    this.maxLeft = options.maxLeft;
    this.maxRight = options.maxRight;
  }

  reset(){
    this.vel = [0,0]
    this.pos = this.startPos
  }

  left(){
    this.vel[0] = -10;
  }

  right(){
    this.vel[0] = 10;
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
    this.gfx.x = this.pos[0] - 75;
    this.gfx.y = this.pos[1] - 75;
  }
}

export default Player
