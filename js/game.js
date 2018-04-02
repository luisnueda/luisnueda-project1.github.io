function Game(canvasId){
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext("2d");

  this.fps = 60;

  this.interval;
  this.background = new Background(this);
  this.player = new Player(this);

}

Game.prototype.start = function() {
  this.interval = setInterval(function(){
    this.clear();
    this.move();
    this.draw();
  }.bind(this), 1000/this.fps)
}

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.draw = function(){
  this.background.draw();
  this.player.draw();


}

Game.prototype.move = function(){
  this.background.move();

}