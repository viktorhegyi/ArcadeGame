// enemy class
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.enemyCoordinateX = -200;
    this.enemyCoordinateY = this.getEnemyPosition();
    this.enemySpeed = this.getRandomNumberForEnemySpeedToStart();
};

Enemy.prototype.update = function(dt) {
    this.enemyCoordinateX += this.enemySpeed;
    // if enemy goes off the screen on the right, put back to the left of the sceen
    if (this.enemyCoordinateX > 500) {
      this.enemyCoordinateX = 0;
      this.enemySpeed = this.getRandomNumberForEnemySpeed() * dt;
      this.enemyCoordinateY = this.getEnemyPosition();
    };
    //check collision with player
    if (player.playerCoordinateX < this.enemyCoordinateX + 60 &&
        player.playerCoordinateX + 30 > this.enemyCoordinateX &&
        player.playerCoordinateY < this.enemyCoordinateY + 20 &&
        player.playerCoordinateY + 30 > this.enemyCoordinateY) {
      player.playerCoordinateX = 303;
      player.playerCoordinateY = 303;
    };
};

// draw enemy
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),
                                this.enemyCoordinateX, this.enemyCoordinateY);
};

// get position 1-3 row for the enemy
Enemy.prototype.getEnemyPosition = function() {
  const enemyCoordinatex = this.getRandomNumberForEnemyPosition();
  switch (enemyCoordinatex) {
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

// random number for the 1-3 for enemy position
Enemy.prototype.getRandomNumberForEnemyPosition = function() {
  return Math.floor(Math.random() * Math.floor(3));
};

// random number for enemy speed
Enemy.prototype.getRandomNumberForEnemySpeed = function() {
  return Math.floor((Math.random() * 400)  + 150);
};

// random number just for the start for the enemy
Enemy.prototype.getRandomNumberForEnemySpeedToStart = function() {
  return Math.floor((Math.random() * 10)  + 2);
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

// instantiate the game objects
const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();
const player = new Player();
const allEnemies = [enemy1, enemy2, enemy3];
