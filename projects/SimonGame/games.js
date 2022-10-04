var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameSpeed;

var started = false;
var level = 0;

$(document).on("keyup", function(){
    if (!started) {
        $("#level-title").text(`Level 0`);
        startOver();
        nextSequence();
        started = true;
    }
});

$(".btn").on("click", function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] !== userClickedPattern[currentLevel]) {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);

        startOver();
        return;
    } else {

        console.log("success");

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(()=>{
                nextSequence();
            }, 1200);
        }
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text(`Level ${level}`);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    let play = "";
    let i = 0;
    console.log(gameSpeed);
    const initSequence = function() {
        console.log("GO");
        console.log(gamePattern[i]);
        play = setInterval(()=> {

            $("#"+gamePattern[i]).fadeOut(75).fadeIn(75);
            playSound(gamePattern[i]);
            i++;
            if ( gameSpeed > 250) gameSpeed-= 10;

            if (i >= gamePattern.length) clearInterval(play);
        }, gameSpeed);
    };
    initSequence();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var scrAudio = `./sounds/${name}.mp3`;
    var sound = new Audio(scrAudio);
    sound.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    gameSpeed = 750;
}