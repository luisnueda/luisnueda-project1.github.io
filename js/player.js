function Player(game){
  this.game = game;

  this.img = new Image();
  this.img.src = "img/ship.png";

  this.x = 0;
  this.y = this.game.canvas.height/2;
  this.w = 190;
  this.h = 170;

  this.dy = 5;

  this.setListeners();

}

Player.prototype.draw = function(){

  this.game.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.w,
    this.h)
}
var a = 38;
Player.prototype.setListeners = function(){
    document.onkeydown = function (event) {

      if (event.keyCode === 32 ) {
        if(this.x < this.game.canvas.width - (this.w + 75)){
          return this.x += 100;          
        }
      }
    }.bind(this);
}

Player.prototype.move = function(){

}