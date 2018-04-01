function Player(game){
  this.game = game;

  this.img = new Image();
  this.img.src = "img/ship.png";

  this.x = 0;
  this.y = (50/100) * this.game.canvas.height;
  this.w = 190;
  this.h = 170;
}

Player.prototype.draw = function(){

  this.game.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.w,
    this.h)
}

Player.prototype.move = function(){
  
}