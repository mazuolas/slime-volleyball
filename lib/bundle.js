/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const JUMP_VEL = -20;
const CANVAS_HEIGHT = 853;

class Player {
  constructor(options){
    this.pos = options.pos;
    this.startPos = options.pos.slice()
    this.vel = [0,0]
    this.color = options.color
    this.maxLeft = options.maxLeft;
    this.maxRight = options.maxRight;
  }

  reset(){
    this.vel = [0,0];
    this.pos = this.startPos.slice();
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

  move(){
    if (this.pos[0] <= this.maxLeft && this.vel[0] < 0) {
      this.pos[0] = this.maxLeft;
    } else if (this.pos[0] >= this.maxRight && this.vel[0] > 0) {
      this.pos[0] = this.maxRight;
    } else{
      this.pos[0] += this.vel[0];
    }

    this.pos[1] += this.vel[1];
    this.gfx.x = this.pos[0] - 75;
    this.gfx.y = this.pos[1] - 75;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Player);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player_js__ = __webpack_require__(0);
const JUMP_VEL = -20;
const CANVAS_HEIGHT = 853;


class HumanPlayer extends __WEBPACK_IMPORTED_MODULE_0__player_js__["a" /* default */] {
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

/* harmony default export */ __webpack_exports__["a"] = (HumanPlayer);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__court_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__human_player_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__computer_player_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__easy_computer_js__ = __webpack_require__(6);





const P1_POS = [200,853];
const P2_POS = [1080,853];

class Game {
  constructor(){
    this.court = null;
    this.gameOptions = {}
    this.aiGame();
    this.onePlayerGame = this.onePlayerGame.bind(this);
    this.twoPlayerGame = this.twoPlayerGame.bind(this);
    this.aiGame = this.aiGame.bind(this);
  }

  onePlayerGame(difficulty) {
    this.gameOptions = {};
    this.gameOptions.player1 = new __WEBPACK_IMPORTED_MODULE_1__human_player_js__["a" /* default */]({
      color: 'green',
      pos: [200,853],
      jumpKey: 'w',
      leftKey: 'a',
      rightKey: 'd',
      maxLeft: 75,
      maxRight: 565
    });
    if (difficulty === 'hard') {
      this.gameOptions.player2 = new __WEBPACK_IMPORTED_MODULE_2__computer_player_js__["a" /* default */]({
        color: 'grey',
        pos: [1080,853],
        maxLeft: 725,
        maxRight: 1205
      });
    } else {
      this.gameOptions.player2 = new __WEBPACK_IMPORTED_MODULE_3__easy_computer_js__["a" /* default */]({
        color: 'grey',
        pos: [1080,853],
        maxLeft: 725,
        maxRight: 1205
      });
    }
    document.getElementById('one-player').className = 'selected';
    document.getElementById('two-player').className = '';
    document.getElementById('ai-game').className = '';
    document.getElementById('p1-controls').style.visibility = 'visible';
    document.getElementById('p2-controls').style.visibility = 'hidden';
    this.court = new __WEBPACK_IMPORTED_MODULE_0__court_js__["a" /* default */](this.gameOptions, this.court);
    this.court.startTicker();
  }

  twoPlayerGame() {
    this.gameOptions = {};
    this.gameOptions.player1 = new __WEBPACK_IMPORTED_MODULE_1__human_player_js__["a" /* default */]({
      color: 'green',
      pos: [200,853],
      jumpKey: 'w',
      leftKey: 'a',
      rightKey: 'd',
      maxLeft: 75,
      maxRight: 565
    });

    this.gameOptions.player2 = new __WEBPACK_IMPORTED_MODULE_1__human_player_js__["a" /* default */]({
      color: 'blue',
      pos: [1080,853],
      jumpKey: 'ArrowUp',
      leftKey: 'ArrowLeft',
      rightKey: 'ArrowRight',
      maxLeft: 725,
      maxRight: 1205
    });
    document.getElementById('one-player').className = '';
    document.getElementById('two-player').className = 'selected';
    document.getElementById('ai-game').className = '';
    document.getElementById('p1-controls').style.visibility= 'visible';
    document.getElementById('p2-controls').style.visibility = 'visible';
    this.court = new __WEBPACK_IMPORTED_MODULE_0__court_js__["a" /* default */](this.gameOptions, this.court);
    this.court.startTicker();
  }

  aiGame() {
    this.gameOptions = {};
    this.gameOptions.player1 = new __WEBPACK_IMPORTED_MODULE_2__computer_player_js__["a" /* default */]({
      color: 'grey',
      pos: [1080,853],
      maxLeft: 725,
      maxRight: 1205
    });

    this.gameOptions.player2 = new __WEBPACK_IMPORTED_MODULE_3__easy_computer_js__["a" /* default */]({
      color: 'grey',
      pos: [200,853],
      maxLeft: 75,
      maxRight: 565
    });
    document.getElementById('one-player').className = '';
    document.getElementById('two-player').className = '';
    document.getElementById('ai-game').className = 'selected';
    document.getElementById('p1-controls').style.visibility = 'hidden';
    document.getElementById('p2-controls').style.visibility = 'hidden';
    this.court = new __WEBPACK_IMPORTED_MODULE_0__court_js__["a" /* default */](this.gameOptions, this.court);
    this.court.startTicker();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const CANVAS_HEIGHT = 853;
const CANVAS_WIDTH = 1280;
const MAX_VEL = 15;

class Ball {
  constructor(options){
    // this.gfx = new createjs.Shape();
    // this.gfx.graphics.beginFill("red").drawCircle(0, 0, 20);
    this.gfx = new Image();
    this.gfx.src = 'img/volleyball.png'
    this.gfx = new createjs.Bitmap(this.gfx);
    this.gfx.x = options.pos[0] - 20;
    this.gfx.y = options.pos[1] - 20;
    this.vel = [0,0];
    this.pos = options.pos;
    this.p1 = options.p1;
    this.p2 = options.p2;
  }

  reset(pos = [200, 600]){
    this.vel = [0,0];
    this.pos = pos;
  }

  fall(){
    if (this.pos[1] < CANVAS_HEIGHT ){
      this.vel[1] += 0.5;
    } else if(this.pos[1] > CANVAS_HEIGHT ){
      // this.vel = [0, 0];
      // this.pos[1] = CANVAS_HEIGHT;
    }
  }


  move(){
    if (this.pos[0] <= 0 && this.vel[0] < 0){
      this.pos[0] = 0;
      this.vel[0] = this.vel[0] * -1;
    } else if (this.pos[0] >= 1280 && this.vel[0] > 0){
      this.pos[0] = 1280;
      this.vel[0] = this.vel[0] * -1;
    } else if ( this.pos[0] > 620 && this.pos[0] < 660 && this.pos[1] > 735) {
      this.vel[0] = this.vel[0] * -1;
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];
    }
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.gfx.x = this.pos[0] - 20;
    this.gfx.y = this.pos[1] - 20;
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
    if((this.distanceFrom(this.p1.pos) <= 95) && this.pos[1] < this.p1.pos[1]) {
      this.bounce(this.p1);
    } else if((this.distanceFrom(this.p2.pos) <= 95) && this.pos[1] < this.p2.pos[1]) {
      this.bounce(this.p2);
    }
  }

  distanceFrom(pos) {
    const xDiff = Math.pow((pos[0] - this.pos[0]), 2 );
    const yDiff = Math.pow((pos[1] - this.pos[1]), 2 );
    return Math.sqrt(xDiff + yDiff);
  }
}
/* harmony default export */ __webpack_exports__["a"] = (Ball);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player_js__ = __webpack_require__(0);
const JUMP_VEL = -20;
const CANVAS_HEIGHT = 853;


class ComputerPlayer extends __WEBPACK_IMPORTED_MODULE_0__player_js__["a" /* default */] {
  constructor(options){
    super(options)
    // this.gfx = new createjs.Shape();
    // this.gfx.graphics.beginFill(this.color).arc(0, 0, 75, Math.PI, 0)
    this.gfx = new Image();
    if (this.maxRight > 1000) {
      this.gfx.src = 'img/right_evil_ai.png'
    } else{
      this.gfx.src = 'img/evil_ai2.png'
    }
    this.gfx = new createjs.Bitmap(this.gfx);
    this.gfx.x = this.pos[0] - 75;
    this.gfx.y = this.pos[1] - 75;
    this.act = this.act.bind(this);
    this.tick = this.tick.bind(this);
  }

  center(){
    const middle = (this.maxLeft + this.maxRight)/2
    if ( (this.pos[0] - 11) > middle ){
      this.left();
    } else if ((this.pos[0] + 11) < middle){
      this.right();
    } else {
      this.vel[0] = 0
    }
  }

  tick(){
    this.act();
    this.move();
    this.fall();

  }

  act(){
    if (!this.ball) {
      return
    }

    let yDiff = this.pos[1] - this.ball.pos[1];
    //offset to ensure hitting ball in the direction of the net
    let offset = 30;
    if (this.maxRight > 1000) {
      offset = -30;
    }
    // 0 = y0 - 853 + vt + 0.5*at^2
    // a = .5 * .5 = .25
    // b = ball.val[1]
    // c = bal.pos[1] - 853

    //time in frames until ball hits the ground
    let t = this.quadratic(0.25, this.ball.vel[1], (this.ball.pos[1] - 853))
    t = Math.floor(t);

    //calculate landing x position and account for wall bounces
    let landingPos = t*this.ball.vel[0] + this.ball.pos[0];
    landingPos = Math.abs(landingPos);
    if (landingPos > 1280) { landingPos = 2560 - landingPos ; }

    if(landingPos < this.maxRight+200 && landingPos > this.maxLeft-200){
      let xDiff = landingPos - this.pos[0] - offset;
      if (xDiff < -15){
        this.left();
      } else if(xDiff > 15){
        this.right();
      } else {
        this.vel[0] = 0;
      }
      if(yDiff < 200 && Math.abs(this.ball.pos[0] - this.pos[0]) < 100){
        this.jump();
      }
    } else {
      this.center();
    }

  }

  quadratic(a,b,c){
    //positive quadratic solution
    return (-1 * b + Math.sqrt(b*b - 4*a*c))/(2*a);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ComputerPlayer);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__human_player_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ball_js__ = __webpack_require__(3);



class Court {
  constructor(options, oldCourt) {
    this.player1 = options.player1;
    this.player2 = options.player2;
    this.score = [0,0];
    this.stage = new createjs.Stage('canvas');

    this.bg = new Image();
    this.bg.src = 'img/background.jpg';
    const ballOptions = {
      pos: [200, 600],
      p1: this.player1,
      p2: this.player2
    }
    this.ball = new __WEBPACK_IMPORTED_MODULE_1__ball_js__["a" /* default */](ballOptions);
    this.bg.onload = this.setup.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    if (oldCourt) {
      createjs.Ticker.removeAllEventListeners('tick')
      document.removeEventListener('keydown', oldCourt.handleKeyDown )
      document.removeEventListener('keyup', oldCourt.handleKeyUp )
    }
    document.addEventListener('keydown', this.handleKeyDown )
    document.addEventListener('keyup', this.handleKeyUp )
  }

  setup(e){
    //background
    this.stage.addChild(new createjs.Bitmap(this.bg))

    //net
    let net = new createjs.Shape();
    net.graphics.beginFill('black').drawRect(0, 0, 10, 100);
    net.x = this.stage.canvas.width/2;
    net.y = this.stage.canvas.height - 100;
    this.stage.addChild(net);

    //ball

    this.stage.addChild(this.ball.gfx);
    this.player1.ball = this.ball;
    this.player2.ball = this.ball;
    //players
    this.stage.addChild(this.player1.gfx);
    this.stage.addChild(this.player2.gfx);

    //score
    let p1score = new createjs.Text("o".repeat(this.score[0]));
    p1score.x = 100;
    p1score.color = 'red'
    p1score.font = 'normal 20px Coiny'
    let p2score = new createjs.Text("o".repeat(this.score[1]));
    p2score.x = 1000;
    p2score.color = 'red'
    p2score.font = 'normal 20px Coiny'
    this.stage.addChild(p1score)
    this.stage.addChild(p2score)

    this.stage.update();
  }

  startTicker(){
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', () => {
      this.ball.tick();
      this.player1.tick();
      this.player2.tick();
      if (this.ball.pos[1] > 853) {
        this.gameOver()
      }
      this.stage.update();
    })
  }

  gameOver(){
    createjs.Ticker.removeAllEventListeners('tick');
    let endGameText = 'Player 1 Wins!'
    let ballStart = [200, 600]
    if (this.ball.pos[0] < 640) {
      endGameText = 'Player 2 Wins!'
      ballStart = [1080, 600]
      this.score[0] += 1
    } else {
      this.score[1] += 1
    }
    this.endGameText = new createjs.Text(endGameText);
    this.endGameText.textAlign = 'center'
    this.endGameText.x = 640;
    this.endGameText.y = 400;
    this.endGameText.color = 'red';
    this.endGameText.font = 'normal 80px Coiny';
    this.stage.addChild(this.endGameText);
    setTimeout(() => this.restart(ballStart), 3000)
  }

  restart(ballPos){
    this.stage.removeChild(this.endGameText)
    this.ball.reset(ballPos);
    this.player1.reset();
    this.player2.reset();
    this.startTicker();
  }

  handleKeyDown(e){
    switch(e.key){
      case(this.player1.jumpKey):
        this.player1.jump();
        break;
      case(this.player2.jumpKey):
        this.player2.jump();
        break;
      case(this.player1.leftKey):
        this.player1.left();
        break;
      case(this.player1.rightKey):
        this.player1.right();
        break;
      case(this.player2.leftKey):
        this.player2.left();
        break;
      case(this.player2.rightKey):
        this.player2.right();
        break;
    }
  }
  handleKeyUp(e){
    switch(e.key){
      case(this.player1.leftKey):
        this.player1.vel[0] = 0;
        break;
      case(this.player1.rightKey):
        this.player1.vel[0] = 0;
        break;
      case(this.player2.leftKey):
        this.player2.vel[0] = 0;
        break;
      case(this.player2.rightKey):
        this.player2.vel[0] = 0;
        break;
    }
  }
};


/* harmony default export */ __webpack_exports__["a"] = (Court);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player_js__ = __webpack_require__(0);
const JUMP_VEL = -20;
const CANVAS_HEIGHT = 853;


class EasyComputerPlayer extends __WEBPACK_IMPORTED_MODULE_0__player_js__["a" /* default */] {
  constructor(options){
    super(options)
    this.gfx = new Image();
    if (this.maxRight > 1000) {
      this.gfx.src = 'img/easy_ai_right.png'
    } else{
      this.gfx.src = 'img/easy_ai_left.png'
    }
    this.gfx = new createjs.Bitmap(this.gfx);
    this.gfx.x = this.pos[0] - 75;
    this.gfx.y = this.pos[1] - 75;
    this.act = this.act.bind(this);
    this.tick = this.tick.bind(this);
  }

  center(){
    const middle = (this.maxLeft + this.maxRight)/2
    if ( (this.pos[0] - 11) > middle ){
      this.left();
    } else if ((this.pos[0] + 11) < middle){
      this.right();
    } else {
      this.vel[0] = 0
    }
  }

  tick(){
    this.act();
    this.move();
    this.fall();
  }

  act(){
    if (!this.ball) {
      return
    }

    let yDiff = this.pos[1] - this.ball.pos[1];
    //offset to ensure hitting ball in the direction of the net
    let offset = 30;
    if (this.maxRight > 1000) {
      offset = -30;
    }

    if(this.ball.pos[0] < this.maxRight+200 && this.ball.pos[0] > this.maxLeft-200){
      let xDiff = this.ball.pos[0] - this.pos[0] - offset;
      if (xDiff < -15){
        this.left();
      } else if(xDiff > 15){
        this.right();
      } else {
        this.vel[0] = 0;
      }
      if(yDiff < 200 && Math.abs(this.ball.pos[0] - this.pos[0]) < 100){
        this.jump();
      }
    } else {
    }

  }
}

/* harmony default export */ __webpack_exports__["a"] = (EasyComputerPlayer);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(2);
//entry file


document.addEventListener('DOMContentLoaded', () => {
  let canvas = document.getElementById('canvas');
  canvas.style.opacity = .5;

  const clearStart = (game) => () => {
    let welcome = document.getElementById('welcome');
    welcome.style.visibility = "hidden";
    canvas.style.opacity = 1;
    game(this.difficulty);
  }
  this.difficulty = 'easy';
  const setDifficulty = (diff) => () => {
    this.difficulty = diff
    if (diff == 'easy') {
      document.getElementById('easy-computer').className = 'selected';
      document.getElementById('hard-computer').className = '';
    } else{
      document.getElementById('easy-computer').className = '';
      document.getElementById('hard-computer').className = 'selected';
    }
  }
  let game = new __WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* default */]();
  let onePlayer = document.getElementById('one-player');
  let twoPlayer = document.getElementById('two-player');
  let aiGame = document.getElementById('ai-game');
  let easy = document.getElementById('easy-computer');
  let hard = document.getElementById('hard-computer');
  easy.addEventListener('click', setDifficulty('easy'));
  hard.addEventListener('click', setDifficulty('hard'));
  onePlayer.addEventListener('click', clearStart(game.onePlayerGame));
  twoPlayer.addEventListener('click', clearStart(game.twoPlayerGame));
  aiGame.addEventListener('click', clearStart(game.aiGame));
});


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map