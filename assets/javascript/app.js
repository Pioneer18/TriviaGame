/*
* You'll create a trivia form with multiple choice or true/false options (your choice).

* The player will have a limited amount of time to finish the quiz. 

* The game ends when the time runs out. The page will reveal the number of questions that players answer correctly and incorrectly.

* Don't let the player pick more than one answer per question.

* Don't forget to include a countdown timer.
*/

$(document).ready(function(){
    //make the game object
    game = {};
        game["Q1"] = ["when was Jonathan D. Sells born?","1992","1989","1994","1990"];
        game["Q2"] = ["where was Jonathan D. Sells born?","Chicago","Tampa","Brandon","St.Petersburg"];
        game["Q3"]= ["what sport is My best?","basketball","baseball","soccer","track & field" ];
        game["Q4"]= ["Most sold item in Walmart?","toilet paper","bottled water","Cola","bananas" ];
        game["Q5"]= ["best type of soup?","clam chowder","pho","ramen","chicken noodle" ];
        game["Q6"]= ["where was President Trump born?","New York","LA","Chicago","DC" ];
        game["Q7"]= ["What is the Long Jump World Record?","29ft 4.25in","24ft 8in","26ft 7in","28ft 9.75in" ];
        game["Q8"]= ["which is the best sport; empirically?","basketball","badminton","ultimate frisbee","cricket" ];
        game["Q9"]= ["which mountain is considered most dangerous to climb in the world?","Mt Everest","Kilimanjaro","Annapurna","K2"];
        game["Q10"]= ["what is the biggest organism in the world?","blue whale","A Sequoia tree","A honey fungus","sperm whale" ];
        
//load game questions and related answers to the html
loadTest();
//randomizeTest();
randomLoadTest();



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

function loadTest () {
    for(i=1; i < 11; i++){
        //this should be looping through html elements by id Q(1-4) and filling in the element with the 
        //object property that matches the id. e.g. id Q1.html(property Q1)
        $(".Q"+ i).html(game["Q"+ i][0]);
        //add splice off index 0 and shuffle the copied array
        var answers = game["Q" + i].slice(1);
        shuffle(answers);
            for(s=1; s<5 ; s++){
                //this loop will target the answer choices of the question and fill in the answers
                //and fill them in
                $(".Q"+ i + "-a"+ s).text(answers[s-1]);
            } 
    }
}

function randomizeTest () {
    console.log("hello");
    var loading = [];
    console.log(loading);
    //need to randomize the order that the properties are displayed, not actually the order in the object
    //make array of the same length as number of trivia questions
    //var loading = [];
    var totalQuestions = Object.keys(game).length;
    //use object.keys to key the total # of questions (properties in the game object)
    //build an array the same length of the object.keys; we start at 1
    for (var i = 1; i < totalQuestions + 1; i++){
        //push to loading to build the array
        loading.push(i);
    }
    console.log(loading);
    //now call the shuffle function on this array to shuffle the question loader
    shuffle(loading);
    console.log(loading);
    return loading

    
}

function randomLoadTest () {
    //shuffle the questions
    var loading = randomizeTest();
    console.log("yes it works! chekc it out below")
    console.log(loading);
    //this should be looping through html elements by id Q(1-4) and filling in the element with the 
    //object property that matches the id. e.g. id Q1.html(property Q1)
    $(".Q"+ i).html(game["Q"+ i][0]);
    //add splice off index 0 and shuffle the copied array
    var answers = game["Q" + i].slice(1);
    shuffle(answers);
        for(s=1; s<5 ; s++){
            //this loop will target the answer choices of the question and fill in the answers
            //and fill them in
            $(".Q"+ i + "-a"+ s).text(answers[s-1]);
        } 
}
  
});