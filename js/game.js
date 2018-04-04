function Game(canvasId){
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext("2d");

  this.fps = 60;
  this.framesCounter = 0;

  this.interval;

  this.background = new Background(this);
  this.score = new Score(this);
  this.player = new Player(this);

  this.obstacles = [new Obstacle(this)];
  this.obstaclesEnemy = [new ObstacleEnemy(this)];
  
  this.explosion = new Explosion(this);

  this.soundtrack = new Audio("sound/soundtrack.mp3")

}

Game.prototype.start = function() {
  this.soundtrack.play();
  this.interval = setInterval(function(){

    this.framesCounter ++;
    if (this.framesCounter > 1000) this.framesCounter = 0;

    this.clear();
    this.clearObstacles();
    this.clearEnemy();
    this.clearBullet();
    this.move();
    this.draw();

    if (this.framesCounter % 100 === 0) {
      this.generateObstacle();
    }
    if (this.framesCounter % 100 === 0){
      this.generateObstacleEnemy();
    }
    if (this.isCollision()) {

    }
    if(this.score.lives == 0){
      this.gameOver();
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

Game.prototype.clearEnemy = function() {
  this.obstaclesEnemy = this.obstaclesEnemy.filter(function(o) {
    return o.x > 0;
  })
};

Game.prototype.clearBullet = function() {
  this.player.bullet = this.player.bullet.filter(function(o) {
    return o.x < this.canvas.width;
  })

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
        
        this.player.bullet.splice(this.player.bullet.indexOf(this.player.bullet[i]),1);

        this.score.points += 1;
      }
    }
  }

  for (var i = 0; i < this.player.bullet.length; i++) {
    for (var j = 0; j < this.obstaclesEnemy.length; j++) {
      
      if (  this.player.bullet[i] && this.obstaclesEnemy[j] &&
        this.player.bullet[i].x + this.player.bullet[i].w >= this.obstaclesEnemy[j].x  - 70 && 
        this.player.bullet[i].y + (this.player.bullet[i].h + 30) >= this.obstaclesEnemy[j].y &&
        this.player.bullet[i].y + this.player.bullet[i].h <= this.obstaclesEnemy[j].y + (this.obstaclesEnemy[j].h - 30)){

        
        this.explosion.draw(this.obstaclesEnemy[j].x, this.obstaclesEnemy[j].y);
        this.obstaclesEnemy.splice(j,1);
        
        this.player.bullet.splice(this.player.bullet.indexOf(this.player.bullet[i]),1);
        
        this.score.points += 5;
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

        this.score.lives -= 1;

      collision = true;
    }
  }.bind(this));

  this.obstaclesEnemy.forEach(function(o){
    if (((this.player.x + this.player.w - 20) >= o.x )&&
        (this.player.x < (o.x + o.w - 10)) &&
        ((this.player.y + this.player.h - 20) >= o.y)&&
        (this.player.y <= o.y + o.h -10)) {

        this.obstaclesEnemy.splice(this.obstaclesEnemy.indexOf(o),1);

        this.explosion.drawShip(this.player.x, this.player.y);
        
        this.score.lives -= 1;
        
      collision = true;
    }
  }.bind(this));

  return collision;
};

Game.prototype.generateObstacle = function() {
  this.obstacles.push(new Obstacle(this));
};

Game.prototype.generateObstacleEnemy = function() {
  this.obstaclesEnemy.push(new ObstacleEnemy(this));
};

Game.prototype.draw = function(){
  this.background.draw();
  this.score.drawScore();
  this.score.drawLives();
  this.player.draw();
  this.player.bullet.forEach (e => {
    e.draw();
  })
  this.obstacles.forEach(function(o) { o.draw(); })
  this.obstaclesEnemy.forEach(function(o) { o.drawEnemy(); })
}

Game.prototype.move = function(){
  this.background.move();
  this.player.move();
  this.player.bullet.forEach (e => {
    e.move();
  })
  this.obstacles.forEach(function(o) { o.move(); })
  this.obstaclesEnemy.forEach(function(o) { o.moveEnemy(); })
}

Game.prototype.stop = function() {
  clearInterval(this.interval);
};

Game.prototype.reset = function() {
  this.background = new Background(this);
  this.score = new Score(this);
  this.score.points = 0;
  this.score.lives = 10;
  this.player = new Player(this);
  this.obstacles = [];
  this.obstaclesEnemy = [];
  this.explosion = new Explosion(this);
  this.framesCounter = 0;
  this.soundtrack = new Audio("sound/soundtrack.mp3")

};

Game.prototype.gameOver = function() {
  this.stop();
  
  if(confirm("GAME OVER. Play again?")) {
    this.reset();
    this.start();
  }
};