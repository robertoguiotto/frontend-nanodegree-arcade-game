// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = this.getBugSpeed();
    // adds collision perimeter
    this.left = this.x;
    this.right = this.x + 50;
    this.top = this.y;
    this.bottom = this.y + 50;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x > 500){
        //moving enemies back to the left when they exit the screen, with random position
        this.x= Math.floor(Math.random() * (-500 + 50)) -500;
    } else {
        this.x += this.speed * dt; // required dt multiply
    }
};

Enemy.prototype.getBugSpeed = function(){
    //Gives one of three random speeds to objects
    var bugSpeed = Math.floor(Math.random() * (10 - 1)) + 1;
    if (Math.floor(bugSpeed) > 8 && Math.floor(bugSpeed) <= 10) {
        return 700;
    } else if (Math.floor(bugSpeed) > 4 && Math.floor(bugSpeed) <= 8) {
        return 500;
    } else if (Math.floor(bugSpeed) < 4) {
        return 300;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = playerStartPositionX;
    this.y = playerStartPositionY;
    // adds collision detection
    this.left = this.x;
    this.right = this.x + 50;
    this.top = this.y;
    this.bottom = this.y +50;

    // Prevents player to go off the screen and detecting player win
    this.update = function (){
        if (this.x > 400) {
            this.x = 400;
        } else if (this.x < 0) {
            this.x = 0;
        } else if (this.y > 400) {
            this.y = 400;
        } else if (this.y < 32) {
            alert('You win! ;)');
            this.y = 400;
            console.log('Game completion detected.')
        };
    };

    // Make player move only inside the squares
    this.handleInput = function(allowedKey){
        switch (allowedKey){
            case 'left': this.x = this.x - 102;
            console.log('Moved left.');
            break;
            case 'up': this.y = this.y - 82;
            console.log('Moved up.');
            break;
            case 'right': this.x = this.x + 102;
            console.log('Moved right.');
            break;
            case 'down': this.y = this.y + 82;
            console.log('Moved down.');
            break;
        };
    };
};

// Set player start position
var playerStartPositionX = 200;
var playerStartPositionY = 400;


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Creates the player (Pseudoclassical Class style)
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Adds collision control
function checkCollisions () {
    allEnemies.forEach(function(enemy) {
        if (enemy.x < player.x + 50 && enemy.x + 68 > player.x && enemy.y < player.y + 50 && enemy.y + 68 > player.y) {
            console.log('Collision detected.');
            player.y = playerStartPositionY;
            alert('You have been hit.  :(');
        }
    })
};

// Push enemies into the Array, passing x & y position parameters.
// Y parameters are set to fit the enemies into the 3-row square schema
var allEnemies = [];
for (var i = 0; i < 3; i++) {
    allEnemies.push(new Enemy(-60, 60 + 85 * i))
};