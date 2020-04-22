var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


function nextSequence() {
    userClickedPattern = [];

    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

    level++;

    $("#level-title").text("Level " + level);
};

function playSound(name) {
      switch (name) {

        case "red":
          var audio = new Audio('sounds/red.mp3');
          audio.play();
          break;

        case "blue":
          var audio = new Audio('sounds/blue.mp3');
          audio.play();
          break;

        case "green":
          var audio = new Audio('sounds/green.mp3');
          audio.play();
          break;

        case "yellow":
          var audio = new Audio('sounds/yellow.mp3');
          audio.play();
          break;

        default:
      }

};

function animatePress(currentColor) {
      $("#" + currentColor).addClass("pressed");
      setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
      }, 100)
};

function checkAnswer (currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000)

    }

  }

  else {
    var wrong = new Audio("sounds/shaokhan.mp3");
    wrong.play();

    $("body").addClass("game-over");
    setTimeout (function() {
      $("body").removeClass("game-over");
    }, 200)

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }

}

function startOver () {
  level = 0;
  gamePattern = [];
  started = false;
}

$(document).keydown(function() {
  if (started == false) {
    started = true;
    $("#level-title").text("Level " + level);
    nextSequence();
  }

  else {

  }



});

$(".btn").click(function () {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);

});
