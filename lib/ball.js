const CANVAS_HEIGHT = 853;
const CANVAS_WIDTH = 1280;
const MAX_VEL = 15;

class Ball {
  constructor(options){
    this.gfx = new createjs.Shape();
    this.gfx.graphics.beginFill("red").drawCircle(0, 0, 20);
    this.gfx.x = options.pos[0];
    this.gfx.y = options.pos[1];
    this.vel = [0,0];
    this.pos = options.pos;
    this.p1 = options.p1;
    this.p2 = options.p2;
  }

  fall(){
    if (this.pos[1] < CANVAS_HEIGHT ){
      this.vel[1] += 0.5;
    } else if(this.pos[1] > CANVAS_HEIGHT ){
      this.vel = [0, 0];
      this.pos[1] = CANVAS_HEIGHT;
    }
  }


  move(){
    if (this.pos[0] <= 0 && this.vel[0] < 0){
      this.pos[0] = 0;
      this.vel[0] = this.vel[0] * -1;
    } else if (this.pos[0] >= 1280 && this.vel[0] > 0){
      this.pos[0] = 1280;
      this.vel[0] = this.vel[0] * -1;
    }
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.gfx.x = this.pos[0];
    this.gfx.y = this.pos[1];
  }

  bounce(player){
    const xDiff = this.pos[0] - player.pos[0];
    const yDiff = this.pos[1] - player.pos[1];
    let absVel = Math.abs(this.vel[0]) + Math.abs(this.vel[1]);
    if (absVel > MAX_VEL) {
      absVel = MAX_VEL;
    }
    if ( xDiff === 0){
      this.vel[1] = -1 * absVel;
    } else if (yDiff === 0){
      this.vel[0] = absVel;
    } else{
      const angle = Math.atan2(xDiff, yDiff);
      this.vel[0] = -1 * absVel * Math.cos(angle);
      this.vel[1] = -1 * absVel * Math.sin(angle);
      if (xDiff < 0) {
        this.vel[0] = this.vel[0] * -1;
        this.vel[1] = this.vel[1] * -1;
      }
    }
    this.vel[0] += player.vel[0]/2;
    this.vel[1] += player.vel[1]/2;

  }

  tick(){
    this.fall();
    this.distanceCheck();
    this.move();
  }

  distanceCheck(){
    if(this.distanceFrom(this.p1.pos) <= 95) {
      this.bounce(this.p1);
    } else if(this.distanceFrom(this.p2.pos) <= 95) {
      this.bounce(this.p2);
    }
  }

  distanceFrom(pos) {
    const xDiff = Math.pow((pos[0] - this.pos[0]), 2 );
    const yDiff = Math.pow((pos[1] - this.pos[1]), 2 );
    return Math.sqrt(xDiff + yDiff);
  }
}
export default Ball;
