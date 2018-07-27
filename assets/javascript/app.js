//OVERALL CONCEPT
//*1)link Trivia API to the project (a completely free JSON API for use in 
//programing projects. Use of this API does not require an API key. Just a
//url that will be generated below)
//*2)Using an API guarantees that the questions will not be the same each time
//however the user should be able to select the category and difficulty of the
//trivia quiz as well
//*3)category and difficulty are selectable from the api, everything really 
//revolves around the API
//*4)Use jquery/javascript to build the html to display the questions; display the
//questions in <h1> and the answer choices in following <input type="radio">
//*5)give the answer


//Session Tokens
//unique keys to track the questions the API has already retrieved, as to not repeat.
//append to API call, prevents repeats
//after exhaustion of the database, choose to reset the token
//deleted after 6 hours of inactivity

//using a session token
//https://opentdb.com/api.php?amount=10&token=YOURTOKENHERE
//retrieve a session token
//https://opentdb.com/api_token.php?command=request
//reset a session token
//https://opentdb.com/api_token.php?command=reset&token=YOURTOKENHERE

//response codes
//appended to each api call to tell developer what the api is doing
//codes:
//0 = success
//1 = no result (not enough questions for your querry size)
//2 = invalid parameter
//3 = token not found; session token does not exist
//4 = token empty; must reset the token

$(document).ready(function(){


    //the start button, when clicked it will `hide` the start screen and `display` the test
    //dynamically create a button and give it its attributes (id,type,&value)
    var startbtn = $("<button>").attr({
        id:"startBtn",
        type:"button",
        value:"Start-Game"
    });
    //label the button
    startbtn.text("Start Game");
    //display the button under the title
    $("#start-screen").append(startbtn);
    //make the button call the hide function and change the game display when clicked (hide is created at the bottom of the page)
    $(startBtn).on("click", function(){
        //query the api and get the trivia test
        ajaxd();
        //once the test has loaded from the api
        //hide the start screen and show the game screen
        hide("start-screen");
        show("game");
        //update the timer for the game (call the timer.start() with 2 minutes
        timer.start();
    });


    //make the restart button
    var restartBtn = $("<button>").attr({
        id:"restartBtn",
        type:"button",
        value:"Restart-Game"
    });
    //label the button
    restartBtn.text("More Trivia Please");
    //add button to the finished screen
    $("#finished-screen").append(restartBtn);
    //make button bring up the start screen and hide the finished screen
    $(restartBtn).on("click",function(){
        //hide("finished-screen");
       // show("start-screen");
       window.location.reload();
    });

    //building the request url
    //the categories are determined by number(need to link user prompts to the corresponding # then pass it in)
    var category = "17";
    //this should be filled by prompting the user somehow (button click,radio input,whatever)
    var difficulty = "medium"; 
    //this is the # of questions on the quiz
    var amount = "10";
    //make variable to hold the finished request url
    var queryURL = "https://opentdb.com/api.php?amount=" + amount +"&category=" + category + "&difficulty=" +
    difficulty + "&type=multiple";

    //make a call to the Trivia API with an ajax object
    

    //this is the "Fisher-Yates Shuffle" apparently "The only way to shuffle
    //an array in JavaScript"
    function shuffle (array) {
        var i = 0
        , j = 0
        , temp = null
    
        for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1))
        temp = array[i]
        array[i] = array[j]
        array[j] = temp
        }
    }
    //This function will hide any element when passed the element id
    function hide(x){
        var y = document.getElementById(x);
        y.style.display = "none";
    }
    //this function will show any element whne passed the element id
    function show(x){
        var y = document.getElementById(x);
        y.style.display = "block";
    }
    
    //can be used to clear out some of above code hopefully
    function createBtn(newButton,Text,Id,Type,Value){
            newButton = $("<button>").attr({
            id:Id,
            type:Type,
            value:Value
        });
        $(newButton).text(Text);
    }

    //build the timer object and its methods
    //Declare variable to the setInterval the runs the countdown
    var intervalId;
    //prevent an accidental start button double click from doubling the speed of the timer
    var clockRunning = false;
    //the timer object
    var timer = {
        time:120,
        reset: function(){
            //put the time back to start
            timer.time = 120;
            var converted = timer.timeConverter(timer.time);
            //display a 2 min time on the page
            $("#timer").text(converted);
        },
        start: function(){
            if(!clockRunning){
                //set the count function to run every second
                intervalId = setInterval(timer.count, 1000);
                //this is where we prevent an accidental double click
                clockRunning = true;
            }
        },
        stop: function(){
            //use clearInterval to stop the count here so we dont just keep going
            clearInterval(intervalId);
            //this sets up the start function to be able to start the clock again
            clockRunning = false;
        },
        //most importantly we need to make a count function
        count:function(){
            //this will be called every second and make the time go down
            timer.time--;
            if(timer.time <= 0){
                timer.stop();
                timer.reset();
                grade();
                hide("game");
                show("finished-screen");
            }
            
            //if the timer gets to 0 or lower stop and reset the time and switch to the finished screen
            //we must pass the updated time through the timeConverter() so it looks like minutes and seconds
            //before we can pass it to the HTML
            var converted = timer.timeConverter(timer.time);
            //now display the timer.time to the #timer div
            $("#timer").html(converted);
        },
        //the time converter runs a bit of math to convert our raw count into minutes and seconds
        timeConverter: function (t) {
            var minutes = Math.floor(t / 60);
            var seconds = t - (minutes * 60);

            if (seconds < 10) {
            seconds = "0" + seconds;
            }

            if (minutes === 0) {
            minutes = "00";
            }
            else if (minutes < 10) {
            minutes = "0" + minutes;
            }

            return minutes + ":" + seconds;
        }

    }
    //grade function
    function grade (){
        //loop through the # of questions times 4 (since each question gets 4 answers)
        for(i = 0; i < amount * 4; i++){
            //this will return true if the input is selected and flase if it is not
            //check if the user selected the answer
            var hold = toGrade[i];
            
            if(hold.prop('checked') === true){
                var ID =$(hold).prop("id");
                
                if(ID === "CA"){
                    //if the answer is correct push it to the correct answer array
                    correctA.push(hold);
                }
                //if the answer is wrong it goes in the wrong array
                else{
                    incorrectA.push(hold);
                }
            }            
        }
        //now display the score
        var totalCorrect = correctA.length;
        var totalIncorrect = incorrectA.length;
        //display total correct and incorrect to the finished-screen
        //create a <div> to hold the score
        var score = $("<div>").attr({ id:"score"}); 
        //add the scores to the div
        $(score).html("Total Correct: " + totalCorrect + "<br>" + "Total Incorrect: " + totalIncorrect);
        $("#finished-screen").append(score);

    }
    //make an array to hold all the answers. it will be looped throuhg by the grade function 
    var toGrade =[];
    var correctA = [];
    var incorrectA = [];
    //a function to hold the ajax call and be called but start button
    function ajaxd(){
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            //PURPOSE: This ajax call will create a test in the HTML element #game.
            //The test is displayed when the user clicks the `start game` button
            //Since it is an API query, the test will be different everytime (till the database is exhausted, then start over);
            var body = $("#game");
            for(i=0; i <response.results.length; i++){
                //access and build elements
                //create a div for each question object's content to be added to
                var qObject = $("<div>"); 
                //put each question in a <h3>
                var question = $("<h3>").text(response.results[i].question);
                //append the new <h3> with the question to the qObject
                $(qObject).append(question);
                //make a new array called answers to hold the correct and incorrect answers
                var answers = response.results[i].incorrect_answers;
                answers.push(response.results[i].correct_answer);
                //now shuffle the array before builiding the input buttons so that
                //the correct answer is not always the last index
                shuffle(answers);
                //push the answers to the toGrade[]
                //now loop through the answers array & build radio inputs
                for( x = 0; x < answers.length; x++){
                    //check if the  current index is the correct answer
                    //if the current index is equal to the correct answer give that input the id of #CA (CorrectAnswer)
                    if(answers[x] === response.results[i].correct_answer){
                        var temp = $("<input>").attr({
                            class:"input",
                            id:"CA",
                            name:"answer" + i,
                            type:"radio",
                            //checked:""
                        });
                        //make a new span and put the answer inside
                        var temp2 = $("<span>").text(answers[x]);
                        //append the new input button and its span to the qObject
                        $(qObject).append(temp).append(temp2);
                        toGrade.push(temp);
                    }
                    //else give it the #IA (IncorrectAnswer)
                    else{
                        var temp = $("<input>").attr({
                            class:"input",
                            id:"IA",
                            name:"answer" + i,
                            type:"radio",
                            //checked:""
                        })
                        //make a new span for the incorrect answers as well
                        var temp2 = $("<span>").text(answers[x]);
                        //append the new input button and its span to the qObject
                        $(qObject).append(temp).append(temp2);
                        toGrade.push(temp);
                    }
                }
                //append the fully loaded qBlock to the body
                $(body).append(qObject);
            }
            //this is where the timer overrides the buttons and changes the screen to finished and stops/resets
            if(timer.time <= 0){
                timer.stop();
                //timer.reset();
                //hide("game");
                //show("finished-screen");
            }
    
            //create the finished button
            var finishedBtn = $("<button>").attr({
            id:"finishedBtn",
            type:"button",
            value:"Finish-Game"
            });
            //label the button
            finishedBtn.text("Finish Game");
            //display the button below the quiz
            $("#game").append(finishedBtn);
            //make the quiz go away and the finished screen appear when finishedBtn is clicked
            $(finishedBtn).on("click", function(){
                timer.stop();
                timer.reset();
                hide("game");
                show("finished-screen");
                grade();
                
            });

        });
    
    }
    
 });
