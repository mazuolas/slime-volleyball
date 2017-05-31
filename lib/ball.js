const CANVAS_HEIGHT = 853;

class Ball {
  constructor(pos){
    this.gfx = new createjs.Shape();
    this.gfx.graphics.beginFill("red").drawCircle(0, 0, 20);
    this.gfx.x = pos[0];
    this.gfx.y = pos[1];
    this.vel = [0,0];
    this.pos = pos;
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
    if (this.pos[0] <= 0 && this.vel[0] < 0){
      this.pos[0] = 0;
      this.vel[0] = this.vel[0] * -1;
    } else if (this.pos[0] >= 1280 && this.vel[0] > 0){
      this.pos[0] = 1280;
      this.vel[0] = this.vel[0] *-1;
    }
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.gfx.x = this.pos[0];
    this.gfx.y = this.pos[1];
  }

  tick(){
    this.move();
    this.fall();
  }
}
export default Ball;
