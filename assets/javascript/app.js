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
    //make a button to hide the start screen and display the trivia
    function hideFunction(){
        var x = document.getElementById("start-screen");
    }


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
        //maybe add an if boolean here or an onclick of the start button to load the quiz
        //TASK: drill into the array of objects, build the html elements to hold the questions & answers
        //fill the elements with the question and related answers. repeat for each object in array
        //body already exists, just bind variable body to it so we can append new elements later
        var body = $(".game");
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

});
