//instruction alert
alert("In this experiment we will measure your response time. You will be shown a series of simple math equations. Answer these equations as quickly and accurately as you can.");

let randomNumber1 = Math.floor(Math.random() * 10) + 1;
let randomNumber2 = Math.floor(Math.random() * 10) + 1;

//Start timer 
let startTime1 = Date.now();
//ask initial question
let response1 = prompt("What is " + randomNumber1 + "+" + randomNumber2 + " ?");
//end timer
let endTime1 = Date.now();
//take end time minus start time and convert from milliseconds into seconds
let reactionTime1 = ((endTime1 - startTime1) / 1000);
//closing alert
alert("You answered " + response1 + " in" + reactionTime1 + " seconds!");

let randomNumber3 = (Math.floor(Math.random() * 10) + 1);
let randomNumber4 = (Math.floor(Math.random() * 10) + 1);

//Start timer 
let startTime2 = Date.now();
//ask initial question
let response2 = prompt("What is " + randomNumber3 + "+" + randomNumber4 + " ?");
//end timer
let endTime2 = Date.now();
//take end time minus start time and convert from milliseconds into seconds
let reactionTime2 = ((endTime2 - startTime2) / 1000);
//closing alert
alert("You answered " + response2 + " in" + reactionTime2 + " seconds!");

//settign random numbers
let randomNumber5 = (Math.floor(Math.random() * 10) + 1);
let randomNumber6 = (Math.floor(Math.random() * 10) + 1);

//Start timer 
let startTime3 = Date.now();
//ask initial question
let response3 = prompt("What is " + randomNumber5 + "+" + randomNumber6 + " ?");
//end timer
let endTime3 = Date.now();
//take end time minus start time and convert from milliseconds into seconds
let reactionTime3 = ((endTime3 - startTime3) / 1000);
//closing alert
alert("You answered " + response3 + " in" + reactionTime3 + " seconds!");

//end message!
alert("Thank you for your participation!");


