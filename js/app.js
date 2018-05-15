var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
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
    if (player.playerCoordinateX < this.x + 60 && player.playerCoordinateX + 30 > this.x
      && player.playerCoordinateY < this.y + 20 && player.playerCoordinateY + 30 > this.y) {
      player.playerCoordinateX = 303;
      player.playerCoordinateY = 303;
    };
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

class Player {
  constructor() {
    this.playerImage = 'images/char-boy.png';
    this.playerCoordinateX = 303;
    this.playerCoordinateY = 303;
    this.playerPosition = function(x, y) {
      const position = [x, y];
      return position;
    }
  };
  update(dt) {
    if (this.playerCoordinateY === -29 ) {
      this.playerCoordinateX = 303;
      this.playerCoordinateY = 303;
    };
  };
  render() {
    ctx.drawImage(Resources.get(this.playerImage),
                  this.playerCoordinateX, this.playerCoordinateY);
  };
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

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function getRandomNumberForBugPosition() {
  return Math.floor(Math.random() * Math.floor(3));
};

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

function getRandomNumberForBugSpeed() {
  return Math.floor((Math.random() * 400)  + 150);
};

function getRandomNumberForBugSpeedToStart() {
  return Math.floor((Math.random() * 10)  + 2);
};

const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();
const player = new Player();
const allEnemies = [enemy1, enemy2, enemy3];
