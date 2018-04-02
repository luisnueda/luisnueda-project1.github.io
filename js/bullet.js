function Bullet(game,x,y){
  this.game = game;

  this.x = x
  this.y = y

  this.r = 10;

}

Bullet.prototype.draw = function(){
  this.game.ctx.beginPath();
  this.game.ctx.arc(this.x+130, this.y+70, this.r, 0, Math.PI * 2);
  this.game.ctx.fillStyle="#FF0000";
  this.game.ctx.fill();
  this.game.ctx.closePath();
}

Bullet.prototype.move = function(){
  this.x += 10;
}

