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
    
    //this loop is select each question and insert that Q class question
    for(i=1; i < 5; i++){
        //this should be looping through html elements by id Q(1-4) and filling in the element with the 
        //object property that matches the id. e.g. id Q1.html(property Q1)
        $(".Q"+ i).html(game["Q"+ i][0]);
            for(s=1; s<5 ; s++){
                //this loop will target the answer choices of the question and fill in the answers
                //and fill them in
                $(".Q"+ i + "-a"+ s).text(game["Q"+ i][s]);
                console.log(game["Q"+ i][s]);
            } 
    }
    


//this is the "Fisher-Yates Shuffle" apparently "The only way to shuffle
//an array in JavaScript"

  
});