function ObstacleEnemy2(game){
  this.game = game;

  this.imgEnemigo2 = new Image();
  this.imgEnemigo2.src = "img/deathStar.png";
  this.x = this.game.canvas.width;
  //this.y = Math.random() * ((this.game.canvas.height - 110) - 0) + 0;
  this.y = 300;
  this.w = 100;
  this.h = 100;

}


ObstacleEnemy2.prototype.drawEnemy2 = function(){
  this.game.ctx.drawImage(
    this.imgEnemigo2,
    this.x,
    this.y,
    this.w,
    this.h)
}

ObstacleEnemy2.prototype.moveEnemy2 = function() {
  this.x -= 1;

};

