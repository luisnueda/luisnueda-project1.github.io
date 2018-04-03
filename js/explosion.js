function Explosion (game){
  this.game = game;

  this.img = new Image();
  this.img.src = "img/explosion.png";

  // this.x;
  // this.y;
  this.w = 100;
  this.h = 100;

}

Explosion.prototype.draw = function(x, y){
  this.game.ctx.drawImage(
    this.img,
    x,
    y,
    this.w,
    this.h)
    
}

Explosion.prototype.drawShip = function(x, y){
  this.game.ctx.drawImage(
    this.img,
    x - 25,
    y - 25,
    200,
    200)

}

