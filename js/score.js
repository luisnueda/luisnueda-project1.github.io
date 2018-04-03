function Score(game){
  this.game = game;

  this.points = 0;
  this.lives = 10;

}

Score.prototype.drawScore = function(){
  this.game.ctx.font = "20px 'Press Start 2P'";
  this.game.ctx.fillStyle = '#fff';
  this.game.ctx.fillText('Score: '+Math.floor(this.points), 450, 25);
  this.game.ctx.textBaseline = "top";
};

Score.prototype.drawLives = function(){
  this.game.ctx.font = "20px 'Press Start 2P'";
  this.game.ctx.fillStyle = '#fff';
  this.game.ctx.fillText('Lives: '+Math.floor(this.lives), 650, 25);
  this.game.ctx.textBaseline = "top";
};