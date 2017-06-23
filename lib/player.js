const JUMP_VEL = -20;
const CANVAS_HEIGHT = 853;

class Player {
  constructor(options){
    this.pos = options.pos;
    this.vel = [0,0]
    this.color = options.color
    this.maxLeft = options.maxLeft;
    this.maxRight = options.maxRight;
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
}

export default Player
