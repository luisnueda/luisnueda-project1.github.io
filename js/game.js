function Game(canvasId){
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext("2d");

  this.fps = 60;
  this.framesCounter = 0;

  this.interval;
  this.background = new Background(this);
  this.player = new Player(this);
  this.obstacles = [new Obstacle(this)];
  
  this.explosion = new Explosion(this);

  this.soundtrack = new Audio("sound/soundtrack.mp3")

}

Game.prototype.start = function() {
  //this.soundtrack.play();
  this.interval = setInterval(function(){

    this.framesCounter ++;
    if (this.framesCounter > 1000) this.framesCounter = 0;

    this.clear();
    this.clearObstacles();
    this.clearBullet();
    this.move();
    this.draw();

    if (this.framesCounter % 100 === 0) {
      this.generateObstacle();
    }
    if (this.isCollision()) {
      
    }

  }.bind(this), 1000/this.fps)
}

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.clearObstacles = function() {
  this.obstacles = this.obstacles.filter(function(o) {
    return o.x > 0;
  })
};

Game.prototype.clearBullet = function() {
  this.player.bullet = this.player.bullet.filter(function(o) {
    return o.x < this.canvas.width;
  })
  console.log(this.player.bullet.length)
};

Game.prototype.isCollision = function() {
  var collision = false;
  
  for (var i = 0; i < this.player.bullet.length; i++) {
    for (var j = 0; j < this.obstacles.length; j++) {
      
      if (  this.player.bullet[i] && this.obstacles[j] &&
        this.player.bullet[i].x + this.player.bullet[i].w >= this.obstacles[j].x  - 70 && 
        this.player.bullet[i].y + (this.player.bullet[i].h + 30) >= this.obstacles[j].y &&
        this.player.bullet[i].y + this.player.bullet[i].h <= this.obstacles[j].y + (this.obstacles[j].h - 30)){

        this.explosion.draw(this.obstacles[j].x, this.obstacles[j].y);
        this.obstacles.splice(j,1);
        
        
        //console.log(this.player.bullet.indexOf(this.player.bullet[i]))
        this.player.bullet.splice(this.player.bullet.indexOf(this.player.bullet[i]),1);

      }
    }
  }
  
  this.obstacles.forEach(function(o){
    if (((this.player.x + this.player.w - 20) >= o.x )&&
        (this.player.x < (o.x + o.w - 10)) &&
        ((this.player.y + this.player.h - 20) >= o.y)&&
        (this.player.y <= o.y + o.h -10)) {

        this.obstacles.splice(this.obstacles.indexOf(o),1);

        this.explosion.drawShip(this.player.x, this.player.y);

      collision = true;
    }
  }.bind(this));
  return collision;
};

Game.prototype.generateObstacle = function() {
  this.obstacles.push(new Obstacle(this));
};

Game.prototype.draw = function(){
  this.background.draw();
  this.player.draw();
  this.player.bullet.forEach (e => {
    e.draw();
  })
  this.obstacles.forEach(function(o) { o.draw(); })
}

Game.prototype.move = function(){
  this.background.move();
  this.player.move();
  this.player.bullet.forEach (e => {
    e.move();
  })
  this.obstacles.forEach(function(o) { o.move(); })

}