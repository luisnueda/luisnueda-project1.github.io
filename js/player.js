function Player(game){
  this.game = game;

  this.img = new Image();
  this.img.src = "img/ship.png";

  this.disparo = new Audio("sound/disparo.mp3")

  this.x = 0;
  this.y = 325.25;
  this.w = 190;
  this.h = 170;

  this.moveRight = false;
  this.moveLeft = false;
  this.moveUp = false;
  this.moveDown = false;

  this.vx = 1;
  this.vy = 1;

  this.ax = 5;
  this.ay = 5;

  this.setListeners();

  this.bullet = []

}

Player.prototype.draw = function(){

  this.game.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.w,
    this.h)
}

Player.prototype.setListeners = function(){
    
  var RIGHT_KEY = 39;
  var LEFT_KEY = 37;
  var UP_KEY = 38;
  var DOWN_KEY = 40;
  var SPACE = 32;

  document.onkeydown = function (event) {
    
      if (event.keyCode === RIGHT_KEY ) {
        this.moveRight = true;
      }

      if(event.keyCode === LEFT_KEY ){
        this.moveLeft = true;
      }

      if(event.keyCode === UP_KEY ){
        this.moveUp = true;
      }

      if(event.keyCode === DOWN_KEY ){
        this.moveDown = true;
      }

      if(event.keyCode === SPACE ){
        this.shoot();
      }
      
    }.bind(this);

    document.onkeyup = function (event){
      if(event.keyCode === RIGHT_KEY){
        this.moveRight = false;
      }
      if(event.keyCode === LEFT_KEY){
        this.moveLeft = false;
      }
      if(event.keyCode === UP_KEY){
        this.moveUp = false;
      }
      if(event.keyCode === DOWN_KEY ){
        this.moveDown = false;
      }
    }.bind(this);
}

Player.prototype.move = function() {

  if (this.moveRight == true && this.x < this.game.canvas.width - (this.w)) {
    this.x += this.vx * this.ax;
  }
  if (this.moveLeft == true && this.x > 0){
    this.x -= this.vx * this.ax;
  }
  if (this.moveUp == true && this.x >= 0 && this.y > 0 + this.h/10){
    this.y -= this.vy * this.ay;
  }
  if (this.moveDown == true && this.x >= 0 && this.y < this.game.canvas.height - this.h){
    this.y += this.vy * this.ay;
  }
};

Player.prototype.shoot = function () {
  this.bullet.push(new Bullet(this.game, this.x, this.y))
  this.disparo.play();
};
