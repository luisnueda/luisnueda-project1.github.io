function ObstacleEnemy(game){
  this.game = game;

  this.imgEnemigo = new Image();
  this.imgEnemigo.src = "img/enemigo1.png";
  this.x = this.game.canvas.width;
  this.y = Math.random() * ((this.game.canvas.height - 110) - 0) + 0;
  this.w = 80;
  this.h = 100;
}


ObstacleEnemy.prototype.drawEnemy = function(){
  this.game.ctx.drawImage(
    this.imgEnemigo,
    this.x,
    this.y,
    this.w,
    this.h)
}

ObstacleEnemy.prototype.moveEnemy = function() {
  this.x -= 10;

};