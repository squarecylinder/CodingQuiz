$(document).ready(function () {
    //Game state variables
    var currentQuestionIndex = 0;
    var questions = [
        {
          title: "Commonly used data types DO NOT include:",
          choices: ["strings", "booleans", "alerts", "numbers"],
          answer: 2
        },
        {
          title: "The condition in an if / else statement is enclosed within ____.",
          choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
          answer: 2
        },
        {
          title: "Arrays in JavaScript can be used to store ____.",
          choices: [
            "numbers and strings",
            "other arrays",
            "booleans",
            "all of the above"
          ],
          answer: 3
        },
        {
          title:
            "String values must be enclosed within ____ when being assigned to variables.",
          choices: ["commas", "curly brackets", "quotes", "parentheses"],
          answer: 2
        },
        {
          title:
            "A very useful tool used during development and debugging for printing content to the debugger is:",
          choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
          answer: 3
        }
      ];
    var time = questions.length * 15;
    var timerId;
    var choicesEl = document.getElementById("choices");
    $(".quiz-container").hide();
    $("#end-screen").hide();
    
    function startQuiz() {
        //Hiding the start screen
        $(".start-screen").hide(500);
        //Showing the question
        $(".quiz-container").show(1000);
        //Starting the timer
        timerId = setInterval(clockTick, 1000);
        //showing start time
        $("#timer").text(time);
        //calling the getQuestion function to start the questions
        getQuestion();
    }
    function getQuestion() {
        //getting questions from the array
        var currentQuestion = questions[currentQuestionIndex];
        //updating the question
        $("#questions").text(currentQuestion.title);
        //clears out any old answers
        $(".choices").text("");
        //using a jQuery each loop to create buttons for each choice
        $(currentQuestion.choices).each(function(choice, i){
            var choiceNode = document.createElement("button");
            choiceNode.setAttribute("class", "choice btn btn-dark btn-lg");
            choiceNode.setAttribute("value", choice);
            $(choiceNode).css("margin", 15);
            choiceNode.textContent = i + ". ";
            //adding an onclick
            $(choiceNode).click(questionClick);
            //should display on page
            // $(choiceNode).after("choices");
            choicesEl.appendChild(choiceNode);
        });
    }
    function questionClick() {
        //answer validation
            console.log(this.value);
        if (this.value != questions[currentQuestionIndex].answer) {
            //subtract time
            time -= 15;

            if (time < 0) {
                time = 0;
            }
            $("#timer").text(time);
            $("#feedback").attr("class", "alert alert-danger");
            $("#feedback").text("Thats incorrect!");
        }
        else {
            $("#feedback").attr("class", "alert alert-success");
            $("#feedback").text("Correct!");
        }
        currentQuestionIndex++;
        if (currentQuestionIndex === questions.length){
            quizEnd();
        }
        else {
            getQuestion();
        }
    }
    function quizEnd() {
        //stoping the timer
        clearInterval(timerId);
        $("#end-screen").show(1000);
        $("#final-score").text(time);
        $(".quiz-container").hide();
    }
    function clockTick() {
        time--;
        $("#timer").text(time);
        if (time <= 0){
            quizEnd();
        }
    }
    function saveHighScore() {
        var initialsEl = document.getElementById("initials");
        var initials = initialsEl.value.trim();
        if (initials !== "") {
          var highscores =
            JSON.parse(window.localStorage.getItem("highscores")) || [];
          var newScore = {
            score: time,
            initials: initials
          };
          highscores.push(newScore);
          window.localStorage.setItem("highscores", JSON.stringify(highscores));
        }
    }
    function checkForEnter(event) {
        if (event.key === "Enter") {
            saveHighScore();
        }
    }
    $("#submit").click(saveHighScore);
    $("#start").click(startQuiz);
    $("#initials").keyup(checkForEnter);
    function printHighscores() {
        // either get scores from localstorage or set to empty array
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
      
        // sort highscores by score property in descending order
        highscores.sort(function(a, b) {
          return b.score - a.score;
        });
      
        highscores.forEach(function(score) {
           // create li tag for each high score
        var liTag = document.createElement("li");
        liTag.textContent = score.initials + " - " + score.score;
        // display on page
        var olEl = document.getElementById("highscores");
        olEl.appendChild(liTag);
        });
      }
      
      function clearHighscores() {
        window.localStorage.removeItem("highscores");
        window.location.reload();
      }
      
      document.getElementById("clear").onclick = clearHighscores;
      
      // run function when page loads
      printHighscores();
      
})