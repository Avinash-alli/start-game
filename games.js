$(document).keypress(function(e) {
  if (e.key === "a") {
    nextSequence();
  }

});
var level = 0;
var buttonColor = ["red", "blue", "green", "yellow"];

var userClickPattern = [];
var gamePattern = [];
$(".btn").click(function() {
  var userChoosenColor = $(this).attr("id");
  userClickPattern.push(userChoosenColor);
  animatedPress(userChoosenColor);
  playSound(userChoosenColor);
  patternMatch(userClickPattern.length - 1);
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChossenColor = buttonColor[randomNumber];
  gamePattern.push(randomChossenColor);

  $("#" + randomChossenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChossenColor);
  $("h1").text(" level  " + level);
  level++;
  userClickPattern = [];
}



function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function animatedPress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");

  }, 100);


}


function patternMatch(currentLevel) {
  if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
    if (userClickPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000)
    }
  } else {
    var wrongclick = new Audio("sounds/wrong.mp3");
    wrongclick.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("WRONG CLICK, Press R to start again");
    $(document).keypress(function(e) {
      if (e.key === "r") {
        gamePattern = [];
        level = 0;
        userClickPattern = [];
        nextSequence();
      }
    });
  }
}
