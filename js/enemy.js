function ObstacleEnemy(game,n){
  this.game = game;

  this.imgEnemigo = new Image();
  this.imgEnemigo.src = "img/enemigo1.png";
  //-----------------------------------------//
  this.imgEnemigo2 = new Image();
  this.imgEnemigo2.src = "img/deathStar.png";
  this.n = n;
  this.properties();

}

// ObstacleEnemy.prototype.collidesWith = function(player){
//   if (  this.player.bullet[i] && this.obstaclesEnemy[j] &&
//     this.player.bullet[i].x + this.player.bullet[i].w >= this.obstaclesEnemy[j].x  - 70 && 
//     this.player.bullet[i].y + (this.player.bullet[i].h + 30) >= this.obstaclesEnemy[j].y &&
//     this.player.bullet[i].y + this.player.bullet[i].h <= this.obstaclesEnemy[j].y + (this.obstaclesEnemy[j].h - 30)){

    
//   return false;
// }
ObstacleEnemy.prototype.properties = function(){
  if(this.n == 0){
    this.x = this.game.canvas.width;
    //this.y = Math.random() * ((this.game.canvas.height - 110) - 0) + 0;
    this.y = 200;
    this.w = 80;
    this.h = 100;
  }

  if(this.n == 1){
    this.x2 = this.game.canvas.width;
    //this.y = Math.random() * ((this.game.canvas.height - 110) - 0) + 0;
    this.y2 = 500;
    this.w2 = 100;
    this.h2 = 100;
  }
}

ObstacleEnemy.prototype.drawEnemy = function() {

  if (this.n == 0) {
    this.game.ctx.drawImage(
      this.imgEnemigo,
      this.x,
      this.y,
      this.w,
      this.h);
  }

  if (this.n == 1) {
    this.game.ctx.drawImage(
      this.imgEnemigo2,
      this.x2,
      this.y2,
      this.w2,
      this.h2
    );
  }
};


ObstacleEnemy.prototype.moveEnemy = function() {
  if(this.n == 0){    
    this.x -= 10;
  }
  if(this.n == 1){
    this.x2 -= 10;
  }
};

ObstacleEnemy.prototype.clearEnemy = function() {
  if(this.n == 0){
   
    this.game.obstaclesEnemy = this.game.obstaclesEnemy.filter(function(o) {
      return o.x > 0;
    });
  }
  if(this.n == 1){
    this.game.obstaclesEnemy = this.game.obstaclesEnemy.filter(function(o) {
    
      return o.x2 > 0;
    });
  }
};
