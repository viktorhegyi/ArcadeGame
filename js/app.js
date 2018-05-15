// enemy class
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = -200;
    this.y = randomBugPosition();
    this.bugSpeed = getRandomNumberForBugSpeedToStart();
};

Enemy.prototype.update = function(dt) {
    this.x += this.bugSpeed;
    if (this.x > 500) {
      this.x = 0;
      this.bugSpeed = getRandomNumberForBugSpeed() * dt;
      this.y = randomBugPosition();
    };
    //check collision with player
    if (player.playerCoordinateX < this.x + 60 && player.playerCoordinateX + 30 > this.x
      && player.playerCoordinateY < this.y + 20 && player.playerCoordinateY + 30 > this.y) {
      player.playerCoordinateX = 303;
      player.playerCoordinateY = 303;
    };
};

// draw enemy
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// player class
class Player {
  constructor() {
    this.playerImage = 'images/char-boy.png';
    this.playerCoordinateX = 303;
    this.playerCoordinateY = 303;
  };
  update(dt) {
    // check if player is in the water and win the game
    if (this.playerCoordinateY === -29 ) {
      this.playerCoordinateX = 303;
      this.playerCoordinateY = 303;
    };
  };
  // draw player
  render() {
    ctx.drawImage(Resources.get(this.playerImage),
                  this.playerCoordinateX, this.playerCoordinateY);
  };
  // player movement
  handleInput(direction) {
    switch (direction) {
      case 'up':
        this.playerCoordinateY < 0 ? this.playerCoordinateY += 0 : this.playerCoordinateY -= 83;
        break;
      case 'down':
        this.playerCoordinateY > 385 ? this.playerCoordinateY += 0 : this.playerCoordinateY += 83;
        break;
      case 'right':
        this.playerCoordinateX > 403 ? this.playerCoordinateX += 0 : this.playerCoordinateX += 101;
        break;
      case 'left':
        this.playerCoordinateX < 1 ? this.playerCoordinateX += 0 : this.playerCoordinateX -= 101;
        break;
    };
  };
};

// key listener
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// random number for the 1-3 for bug position
function getRandomNumberForBugPosition() {
  return Math.floor(Math.random() * Math.floor(3));
};

// get position 1-3 row for the bug
function randomBugPosition() {
  const bugCoordinatex = getRandomNumberForBugPosition();
  switch (bugCoordinatex) {
    case 0:
      return 54;
      break;
    case 1:
      return 137;
      break;
    case 2:
      return 220;
  }
};

// random number for bug speed
function getRandomNumberForBugSpeed() {
  return Math.floor((Math.random() * 400)  + 150);
};

// random number just for the start for the bug
function getRandomNumberForBugSpeedToStart() {
  return Math.floor((Math.random() * 10)  + 2);
};

// instantiate the game objects
const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();
const player = new Player();
const allEnemies = [enemy1, enemy2, enemy3];
