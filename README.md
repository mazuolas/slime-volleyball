# Slime Volleyball
[Live link](https://mazuolas.github.io/slime-volleyball/)

Slime volleyball is a one or two player browser based game.  It was build using Easeljs to manipulate a HTML5 canvas and JavaScript to calculate the game physics and logic.

## Features and implementation

### AI computer player
![AI v AI](./docs/slime_ai.gif)

An intelligent computer player was created that uses constant acceleration physics equations to calculate where the ball will land. It takes into account how the ball bounces off the edges of the play area.  The computer moves into position to hit the ball as soon as the trajectory of the ball changes and jumps when the ball is close enough to hit.  

``` JavaScript
quadratic(a,b,c){
  //positive quadratic solution
  return (-1 * b + Math.sqrt(b*b - 4*a*c))/(2*a);
}
//time in frames until ball hits the ground
let t = this.quadratic(0.25, this.ball.vel[1], (this.ball.pos[1] - 853))

//calculate landing x position and account for wall bounces
let landingPos = t*this.ball.vel[0] + this.ball.pos[0];
landingPos = Math.abs(landingPos);
if (landingPos > 1280) { landingPos = 2560 - landingPos ; }
```


### Ball Bounce Physics

The direction that the ball bounces when it is hit by a slime depends on where on the slime the ball impacts and how the slime is moving at the time of impact.  JavaScript's trigonometry functions are used to calculate the new angle and scale the x and y velocities of the ball.

``` JavaScript
// 'this' is the ball
const xDiff = this.pos[0] - player.pos[0];
const yDiff = this.pos[1] - player.pos[1];

const angle = Math.atan2(xDiff, yDiff);

let absVel = Math.abs(this.vel[0]) + Math.abs(this.vel[1]);
// x velocity
this.vel[0] = -1 * absVel * Math.cos(angle);

// y velocity
this.vel[1] = -1 * absVel * Math.sin(angle);
```


## Future Development

#### Add different computer difficulty settings
Currently the only option for ai to play against is very smart and responsive and will never lose.  

#### Add scoring and keep track of number of win/loss
Allow for the game to continue after the first point, reseting the position of the ball and players.  Change which player is serving based on who scored last.
