function Bullet(game,x,y){
  this.game = game;

  this.x = x
  this.y = y

  this.img = new Image();
  this.img.src = "img/blue.png"

  this.r = 10;

  this.w = 40;
  this.h = 40;

}

Bullet.prototype.draw = function(){
  // this.game.ctx.beginPath();
  // this.game.ctx.arc(this.x+130, this.y+70, this.r, 0, Math.PI * 2);
  // this.game.ctx.fillStyle="#FF0000";
  // this.game.ctx.fill();
  // this.game.ctx.closePath();
  this.game.ctx.drawImage(
    this.img,
    this.x + 150,
    this.y + 50,
    this.w,
    this.h)


}

Bullet.prototype.move = function(){
  this.x += 10;
}

