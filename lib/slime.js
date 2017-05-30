//entry file

 const init = () => {
 }

document.addEventListener('DOMContentLoaded', () => {
  let stage = new createjs.Stage('canvas');
  let circle = new createjs.Shape()
  circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
  circle.x = 100;
  circle.y = 100;
  stage.addChild(circle);
  stage.update();
});
