const JUMP_VEL = -20;
const CANVAS_HEIGHT = 853;

class HumanPlayer {
  constructor(options){
    this.pos = options.pos;
    this.startPos = options.pos;
    this.vel = [0,0];
    this.color = options.color;
    this.jumpKey = options.jumpKey;
    this.leftKey = options.leftKey;
    this.rightKey = options.rightKey;
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

  tick(){
    this.move();
    this.fall();
  }

}

export default HumanPlayer;
