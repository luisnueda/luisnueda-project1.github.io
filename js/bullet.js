function Bullet(game,x,y){
  this.game = game;

  this.x = x
  this.y = y

  this.img = new Image();
  this.img.src = "img/blue.png"

  this.w = 40;
  this.h = 40;

}

Bullet.prototype.draw = function(){

  this.game.ctx.drawImage(
    this.img,
    this.x + 150,
    this.y + 50,
    this.w,
    this.h)

}

Bullet.prototype.move = function(){
  this.x += 50;
}

Bullet.prototype.clearBullet = function() {
  this.game.player.bullet = this.game.player.bullet.filter(function(o) {
    return o.x < this.canvas.width;
  })

};