// window.onload = function(){
//   var game = new Game("canvas");

  
//   game.start();
// };
$(document).ready(function(){
  var game = new Game("canvas");
  
  $("#start").click(function(){
    // setTimeout(game.start(),1000);
    game.start();
    $(".intro").fadeOut(500);
    $("#canvas").fadeIn(100);
  })

  $("#retry").click(function(){
    game.reset();
    game.start();
  })
})