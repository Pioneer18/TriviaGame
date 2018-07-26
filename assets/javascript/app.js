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
        console.log("boo");
        //idk = true;
        //hide the test questions
        hide("start-screen");
        show("game");
    });
    //make the restart button
    var restartBtn = $("<button>").attr({
        id:"restartBtn",
        type:"button",
        value:"Restart-Game"
        });
        //label the button
        restartBtn.text("Restart Game");
        //display the button below the quiz
        $("#finsihed-screen").append(restartBtn);
        //make the quiz go away and the finished screen appear when restartBtn is clicked
        $(finishedBtn).on("click", function(){
            hide("finished-screen");
            show("start-screen");
        });

    //building the request url
    //the categories are determined by number(need to link user prompts to the corresponding # then pass it in)
    var category = "17";
    //this should be filled by prompting the user somehow (button click,radio input,whatever)
    var difficulty = "medium" 
    //this is the # of questions on the quiz
    var amount = "10"
    //make variable to hold the finished request url
    var queryURL = "https://opentdb.com/api.php?amount=" + amount +"&category=" + category + "&difficulty=" +
    difficulty + "&type=multiple";

    //make a call to the Trivia API with an ajax object
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
            //now loop through the answers array & build radio inputs
            for( x = 0; x < answers.length; x++){
                //check if the  current index is the correct answer
                //if the current index is equal to the correct answer give that input the id of #CA (CorrectAnswer)
                if(answers[x] === response.results[i].correct_answer){
                    var temp = $("<input>").attr({
                        id:"CA",
                        name:"answer",
                        type:"radio",
                    });
                    //make a new span and put the answer inside
                    var temp2 = $("<span>").text(answers[x]);
                    //append the new input button and its span to the qObject
                    $(qObject).append(temp).append(temp2);
                }
                //else give it the #IA (IncorrectAnswer)
                else{
                    var temp = $("<input>").attr({
                        id:"IA",
                        name:"answer",
                        type:"radio"
                    })
                    //make a new span for the incorrect answers as well
                    var temp2 = $("<span>").text(answers[x]);
                    //append the new input button and its span to the qObject
                    $(qObject).append(temp).append(temp2);
                }
            }
            //append the fully loaded qBlock to the body
            $(body).append(qObject);
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
            hide("game");
            show("finished-screen");
        });

    });

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

});
