//instruction alert
alert("In this experiment we will measure your response time. You will be shown a series of simple math equations. Answer these equations as quickly and accurately as you can.");

//Start timer 
let startTime1 = Date.now();
//ask initial question
let response1 = prompt("What is 1 + 2?");
//end timer
let endTime1 = Date.now();
//take end time minus start time and convert from milliseconds into seconds
let reactionTime1 = ((endTime1 - startTime1) / 1000);
//closing alert
alert("You answered " + response1 + " in" + reactionTime1 + " seconds!");

//Start timer 
let startTime2 = Date.now();
//ask initial question
let response2 = prompt("What is 4 + 2?");
//end timer
let endTime2 = Date.now();
//take end time minus start time and convert from milliseconds into seconds
let reactionTime2 = ((endTime2 - startTime2) / 1000);
//closing alert
alert("You answered " + response2 + " in" + reactionTime2 + " seconds!");

//Start timer 
let startTime3 = Date.now();
//ask initial question
let response3 = prompt("What is 6 + 4?");
//end timer
let endTime3 = Date.now();
//take end time minus start time and convert from milliseconds into seconds
let reactionTime3 = ((endTime3 - startTime3) / 1000);
//closing alert
alert("You answered " + response3 + " in" + reactionTime3 + " seconds!");

//end message!
alert("Thank you for your participation!");


