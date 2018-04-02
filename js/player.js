function Player(game){
  this.game = game;

  this.img = new Image();
  this.img.src = "img/ship.png";

  this.x = 0;
  this.y = this.game.canvas.height/2;
  this.w = 190;
  this.h = 170;

  this.dy = 30;

  this.setListeners();

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
    document.onkeydown = function (event) {
    
    var RIGHT_KEY = 39;
    var LEFT_KEY = 37;
    var UP_KEY = 38;
    var DOWN_KEY = 40;

      if (event.keyCode === RIGHT_KEY ) {
        this.moveRight();
      }

      if(event.keyCode === LEFT_KEY ){
        this.moveLeft();
      }

      if(event.keyCode === UP_KEY ){
        this.moveUp();
      }

      if(event.keyCode === DOWN_KEY ){
        this.moveDown();
      }
    }.bind(this);
}

Player.prototype.moveRight = function(){
  if(this.x < this.game.canvas.width - (this.w)){
    return this.x += this.dy;          
  }
}

Player.prototype.moveLeft = function(){
  if(this.x > 0){
    return this.x -= this.dy;
  }
}

Player.prototype.moveUp = function(){
  console.log(this.x, this.y)
  if(this.x >= 0 && this.y > 0 + this.h/10){
    return this.y -= this.dy;
  }
}

Player.prototype.moveDown = function(){
  if(this.x >= 0 && this.y < this.game.canvas.height - (this.h + this.dy)){
    return this.y += this.dy;
  }
}