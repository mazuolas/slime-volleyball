//entry file

 const init = () => {
 }

document.addEventListener('DOMContentLoaded', () => {
  let stage = new createjs.Stage('canvas');
  let bg = new Image();
  bg.src = 'img/background.jpg';
  bg.onload = (e) => {
    stage.addChild(new createjs.Bitmap(bg))
    stage.addChild(circle);
    stage.update();
  };


  let circle = new createjs.Shape()
  circle.graphics.beginFill("red").drawCircle(0, 0, 20);
  circle.x = 100;
  circle.y = 600;
  stage.update();
  createjs.Ticker.setFPS(60);
  let vel = 5;
  createjs.Ticker.addEventListener('tick', () => {
    if ((circle.x > stage.canvas.width && vel > 0) || (circle.x < 0 && vel < 0)) {
       vel = vel * -1;
     }
    circle.x += vel;
    stage.update();
  })
});
