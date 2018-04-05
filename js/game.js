function Game(canvasId){
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext("2d");

  this.fps = 60;
  this.framesCounter = 0;
  this.framesTime = 0;

  this.estado = false;

  this.interval;

  this.background = new Background(this);
  this.score = new Score(this);
  this.player = new Player(this);

  this.obstacles = [];
  this.obstaclesEnemy = [];
  this.obstaclesEnemy2 = [];
  
  this.explosion = new Explosion(this);

  this.soundtrack = new Audio("sound/soundtrack.mp3");
  this.gameOverSound = new Audio("sound/gameOver.mp3")
  this.soundtrackGameOver = new Audio("sound/soundtrackGameOver.mp3");
  this.levelUp = new Audio("sound/levelUp.mp3");

}

Game.prototype.start = function() {
  this.soundtrack.play();
  this.interval = setInterval(
    function() {
      this.framesCounter++;
      this.framesTime++;
      if (this.framesCounter > 1000) this.framesCounter = 0;

      this.clear();
      this.move();
      this.draw();
      this.isCollision();

      if((this.framesTime >= 1000 && this.framesTime<= 1000) 
        || (this.framesTime >= 2000 && this.framesTime <= 2000)){
        this.levelUp.play();
      }

      if (this.framesTime < 900) {
        if (this.framesCounter % 100 === 0) {
          this.generateObstacle();
        }
        if (this.framesCounter % 100 === 0) {
          this.generateObstacleEnemy();
        }
      } else if (this.framesTime > 1000 && this.framesTime <1990) {
        this.estado = true;
        this.score.drawLevel();

        if (this.framesCounter % 200 === 0) {
          this.generateObstacle();
        }
        if (this.framesCounter % 40 === 0) {
          this.generateObstacleEnemy();
        }
        if (this.framesCounter % 1000 === 0) {
          this.generateObstacleEnemy2();
        }

      } else if (this.framesTime > 2000) {
        this.estado = true;
        
        this.score.drawLevel3();
        if (this.framesCounter % 200 === 0) {
          this.generateObstacle();
        }
        if (this.framesCounter % 10 === 0) {
          this.generateObstacleEnemy();
        }
        if (this.framesCounter % 1000 === 0) {
          this.generateObstacleEnemy2();
        }
      }

      if (this.score.lives == 0) {
        this.gameOverSound.play();
        this.gameOver();
        this.soundtrackGameOver.play();

      }
    }.bind(this),
    1000 / this.fps
  );
};

// ---- Clear ---- //

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.obstacles.forEach(function(e) {
    e.clearObstacles();
  });
  this.obstaclesEnemy.forEach(function(e) {
    e.clearEnemy();
  });
  this.obstaclesEnemy2.forEach(function(e) {
    e.clearEnemy2();
  });
  this.player.bullet.forEach(function(e) {
    e.clearBullet();
  });
};

// ---- Collision ---- //

Game.prototype.isCollision = function() {
  
  
  this.player.isCollision(this.obstacles);
  this.player.isCollision(this.obstaclesEnemy);
  this.player.isCollision(this.obstaclesEnemy2);

  this.player.bullet.forEach(function(e){
    e.isCollision(this.obstacles);
    e.isCollision(this.obstaclesEnemy);
    e.isCollision(this.obstaclesEnemy2);
  }.bind(this));  
};

// ---- Generate ---- //

Game.prototype.generateObstacle = function() {
  this.obstacles.push(new Obstacle(this));
};
Game.prototype.generateObstacleEnemy = function() {
  this.obstaclesEnemy.push(new ObstacleEnemy(this));
};
Game.prototype.generateObstacleEnemy2 = function() {
  this.obstaclesEnemy2.push(new ObstacleEnemy2(this));
};


// ---- Draw ---- //

Game.prototype.draw = function(){
  this.background.draw();
  this.score.drawScore();
  this.score.drawLives();
  this.score.drawFrames();
  this.player.draw();
  this.player.bullet.forEach (e => {
    e.draw();
  })
  this.obstacles.forEach(function(o) { o.draw(); })
  this.obstaclesEnemy.forEach(function(o) { o.drawEnemy(); })
  if(this.estado){
    this.obstaclesEnemy2.forEach(function(o) { o.drawEnemy2(); })
  }
  
}

// ---- Move ---- //

Game.prototype.move = function(){
  this.background.move();
  this.player.move();
  this.player.bullet.forEach (e => {
    e.move();
  })
  this.obstacles.forEach(function(o) { o.move(); })
  this.obstaclesEnemy.forEach(function(o) { o.moveEnemy(); })
  this.obstaclesEnemy2.forEach(function(o) { o.moveEnemy2(); })
}

// ---- Stop ---- //

Game.prototype.stop = function() {
  clearInterval(this.interval);
};

// ---- Reset ---- //

Game.prototype.reset = function() {
  this.background = new Background(this);
  this.score = new Score(this);
  this.score.points = 0;
  this.score.lives = 10;
  this.player = new Player(this);
  this.obstacles = [];
  this.obstaclesEnemy = [];
  this.obstaclesEnemy2 = [];
  this.explosion = new Explosion(this);
  this.framesCounter = 0;
  this.framesTime = 0;
  this.soundtrack = new Audio("sound/soundtrack.mp3");
  $(".gameOver").fadeOut(100);

};

// ---- GameOver ---- //

Game.prototype.gameOver = function() {
  this.stop();
  this.soundtrack.pause();
  $(".gameOver").fadeIn(100);
};