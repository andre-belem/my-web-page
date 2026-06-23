

var INITIAL = 1;
var GAME_PLAYING = 2;
var GAME_OVER = 3;

function FlappyMonster(canvas) {
  // Base
  var game = this;

  //Global Attributes
  game.canvas = canvas;
  game.context = game.canvas.getContext('2d');

  // Game State
  game.currentState = INITIAL;
}

FlappyMonster.prototype.start = function() {
  // Base
  var game = this;

  // Start Game
  window.requestAnimationFrame(function() {
    game.runGameLoop();
  });
};

FlappyMonster.prototype.runGameLoop = function() {
  // Base
  var game = this;

  // Game State
  switch (game.currentState) {
    case INITIAL:
      // DRAW INITIAL SCREEN
      game.drawInitialScreen();
      break;
    case GAME_PLAYING:
      // DRAW GAME PLAYING SCREEN
      game.drawGamePlayingScreen();
      break;
    case GAME_OVER:
      // DRAW GAME OVER SCREEN
      game.drawGameOverScreen();
      break;
  }
};

FlappyMonster.prototype.drawInitialScreen = function() {
  // Base
  var game = this;

  // Draw

  // Background
  game.context.fillStyle = 'black';
  game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);

  // Text
  game.context.fillStyle = 'white';
  game.context.font = '36px Arial';
  game.context.fillText('INITIAL', game.canvas.width / 2 - 100, game.canvas.height / 2);
};

FlappyMonster.prototype.drawGamePlayingScreen = function() {
  // Base
  var game = this;

  // Draw

  // Background
  game.context.fillStyle = 'black';
  game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);

  // Text
  game.context.fillStyle = 'white';
  game.context.font = '36px Arial';
  game.context.fillText('GAME PLAYING', game.canvas.width / 2 - 100, game.canvas.height / 2);
};

FlappyMonster.prototype.drawGameOverScreen = function() {
  // Base
  var game = this;

  // Draw

  // Background
  game.context.fillStyle = 'black';
  game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);

  // Text
  game.context.fillStyle = 'white';
  game.context.font = '36px Arial';
  game.context.fillText('GAME OVER', game.canvas.width / 2 - 100, game.canvas.height / 2);
};
