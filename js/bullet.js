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

Bullet.prototype.isCollision = function(elem){

  for (var i = 0; i < this.game.player.bullet.length; i++) {
    for (var j = 0; j < elem.length; j++) {
      
      if (  this.game.player.bullet[i] && elem[j] &&
        this.game.player.bullet[i].x + this.game.player.bullet[i].w >= elem[j].x  - 70 && 
        this.game.player.bullet[i].y + (this.game.player.bullet[i].h + 30) >= elem[j].y &&
        this.game.player.bullet[i].y + this.game.player.bullet[i].h <= elem[j].y + (elem[j].h - 30)){

        this.game.explosion.draw(elem[j].x, elem[j].y);
        elem.splice(j,1);
        
        this.game.player.bullet.splice(this.game.player.bullet.indexOf(this.game.player.bullet[i]),1);

        this.game.score.points += 1;
      }
    }
  }
}