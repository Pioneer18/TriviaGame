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
console.log(queryURL);

//make a call to the Trivia API with an ajax object
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response);
});


