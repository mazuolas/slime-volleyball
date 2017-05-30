const JUMP_VEL = 20;

class HumanPlayer {
  constructor(options){
    this.pos = options.pos;
    this.vel = [0,0];
    this.color = options.color;
    
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
