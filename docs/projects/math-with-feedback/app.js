//instruction alert
alert("In this experiment we will measure your response time. You will be shown a series of simple math equations. Answer these equations as quickly and accurately as you can.");

let randomNumber1 = Math.floor(Math.random() * 10) + 1;
let randomNumber2 = Math.floor(Math.random() * 10) + 1;

let answer1 = randomNumber1 + randomNumber2;

//Start timer 
let startTime1 = Date.now();
//ask initial question
let response1 = prompt("What is " + randomNumber1 + "+" + randomNumber2 + " ?");
//end timer
let endTime1 = Date.now();
//take end time minus start time and convert from milliseconds into seconds
let reactionTime1 = ((endTime1 - startTime1) / 1000);
//closing alert
let feedback1 = '';
if (response1 == answer1) {
    feedback1 = 'Correct!';
} else {
    feedback1 = 'Incorrect.';
}
alert("You answered " + response1 + " in " + reactionTime1 + " seconds, this answer was " + feedback1);

let randomNumber3 = Math.floor(Math.random() * 10) + 1;
let randomNumber4 = Math.floor(Math.random() * 10) + 1;

let answer2 = randomNumber3 + randomNumber4;

//Start timer 
let startTime2 = Date.now();
//ask initial question
let response2 = prompt("What is " + randomNumber3 + " + " + randomNumber4 + " ?");
//end timer
let endTime2 = Date.now();
//take end time minus start time and convert from milliseconds into seconds
let reactionTime2 = ((endTime2 - startTime2) / 1000);
//closing alert
let feedback2 = '';
if (response2 == answer2) {
    feedback2 = 'Correct!';
} else {
    feedback2 = 'Incorrect.';
}
alert("You answered " + response2 + " in " + reactionTime2 + " seconds, this answer was " + feedback2);

let randomNumber5 = Math.floor(Math.random() * 10) + 1;
let randomNumber6 = Math.floor(Math.random() * 10) + 1;

let answer3 = randomNumber5 + randomNumber6;

//Start timer 
let startTime3 = Date.now();
//ask initial question
let response3 = prompt("What is " + randomNumber5 + " + " + randomNumber6 + " ?");
//end timer
let endTime3 = Date.now();
//take end time minus start time and convert from milliseconds into seconds
let reactionTime3 = ((endTime3 - startTime3) / 1000);
//closing alert
let feedback3 = '';
if (response3 == answer3) {
    feedback3 = 'Correct!';
} else {
    feedback3 = 'Incorrect.';
}
alert("You answered " + response3 + " in" + reactionTime3 + " seconds, this answer was" + feedback3);
