var timer = 120;
var score = 0;
var questionList = [];
var answerList = [];

function startTimer() {
    var timerInterval = setInterval(function(){
        timer--;
        $("#timer").text(timer + " Seconds remaining!");
        if(timer === 0) {
            clearInterval(timerInterval);
            sendMessage()
        }
    }, 1000);
}
function sendMessage(){
    $("#timer").text("Times Up!");
}
function setScore() {
    $("#score").text("Score: " + score);
}
function askQuestion() {
    for(var i = 0; i < questionList.length; i++) {
        $("#quiz-question").text(questionList[i])
    }
}

startTimer();
setScore();