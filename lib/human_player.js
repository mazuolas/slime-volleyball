const JUMP_VEL = -20;
const CANVAS_HEIGHT = 853;
import Player from './player.js'

class HumanPlayer extends Player {
  constructor(options){
    super(options);
    this.jumpKey = options.jumpKey;
    this.leftKey = options.leftKey;
    this.rightKey = options.rightKey;


    // this.gfx = new createjs.Shape();
    // this.gfx.graphics.beginFill(this.color).arc(0, 0, 75, Math.PI, 0)
    this.gfx = new Image();
    if (this.color === 'green') {
      this.gfx.src = 'img/green_slime.png'
    } else {
      this.gfx.src = 'img/blue_slime.png'
    }
    this.gfx = new createjs.Bitmap(this.gfx);
    this.gfx.x = this.pos[0] - 75;
    this.gfx.y = this.pos[1] - 75;

  }

  tick(){
    this.move();
    this.fall();
  }

}

export default HumanPlayer;
