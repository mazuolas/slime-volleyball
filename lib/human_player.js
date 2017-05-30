const JUMP_VEL = 20;

class HumanPlayer {
  constructor(options){
    this.pos = options.pos;
    this.vel = [0,0];
    this.color = options.color;
    this.stage = options.stage;

    this.gfx = new createjs.Shape();
    this.gfx.graphics.beginFill(this.color).arc(0, 0, 75, Math.PI, 0)
    this.gfx.x = this.pos[0];
    this.gfx.y = this.pos[1];
  }

  move(){
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }

  jump(){
    this.vel[1] = JUMP_VEL;
  }

  fall(){
    this.vel[1] = JUMP_VEL*-1;
  }


}

export default HumanPlayer;
