var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"]
var started = false;
var level = 0;

//Handle Key pressed

$(document).keypress(function() {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
})

//Handle Click

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1)
})

function nextSequence() {
    userClickedPattern = []
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor)
    level++;

    $("h1").text("Level " + level);
}

function playSound(objectColor) {
    var audio = new Audio("sounds/" + objectColor + ".mp3")
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100)
}

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000)
        }

    } else {

        console.log("Wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200)

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}