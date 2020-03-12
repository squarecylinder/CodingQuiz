var timer = 120;

startTimer();

var score = 0;
// var questionList = [
//     {
//         question: "The correct answer is b",
//         answers: {
//             a: "Wrong",
//             b: "Right",
//             c: "Wrong"
//         },
//         correctAnswer: "b"
//     },
//     {
//         question: "The correct answer is a",
//         answers: {
//             a: "Right",
//             b: "Wrong",
//             c: "Wrong"
//         },
//         correctAnswer: "a"
//     },
//     {
//         question: "The correct answer is c",
//         answers: {
//             a: "wrong",
//             b: "wrong",
//             c: "Right"
//         },
//         correctAnswer: "c"
//     }
// ];
setScore();
// askQuestion();
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
    $("#initial-form").attr("style", "display:block");
}
function setScore() {
    $("#score").text("Score: " + score);
}
// function askQuestion() {
//     for(var i = 0; i < questionList.length; i++) {
//         $("#quiz-question").text("test");
//         console.log(JSON.stringify(questionList));
//     }
// }