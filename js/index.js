
$(document).ready(function(){
  var game = new Game("canvas");

  $(".gameOver").hide();

  $("#start").click(function(){

    game.start();
    $("#video-intro").get(0).pause();
    $(".intro").fadeOut(500);
    $("#canvas").fadeIn(100);
  })

  $("#retry").click(function(){
    game.reset();
    game.start();
  })
})