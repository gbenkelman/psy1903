AI Prompts:

"why does this not work? let num1 = Math.floor(Math.random() * 10) + 1;
let num2 = Math.floor(Math.random() * 10) + 1;
let answer1 = (num1 + num2);
let num3 = Math.floor(Math.random() * 10) + 1;
let num4 = Math.floor(Math.random() * 10) + 1;
let answer2 = (num3 + num4);
let num5 = Math.floor(Math.random() * 10) + 1;
let num6 = Math.floor(Math.random() * 10) + 1;
let answer3 = (num5 + num6);
// Show word or pseudo word (on repeat)
// Create an array of conditions
let conditions = [
    { num1: num1, num2: num2, answer: answer1 },
    { num1: num3, num2: num4, answer: answer2 },
    { num1: num5, num2: num6, answer: answer3 },
];"

"let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: 
    <h1>Thank you for participating!</h1> 
    <p>You can close this tab.</p>
    ,
    choices: ['NO KEYS'],
    on_start: function () {
        let data = jsPsych.data.get().csv();
        console.log(data);
    }
}; 
I want the function to show more specific data from this experiment; where do I input the sepcific factors I want to see?"

"similar to .ignore in JS to ignore data, is there a specific function that iwll tell the code to collect a certain subset of the results?"


"how do I use two different JS files in one project? I am creating a condition in conditions.js and referencing it in experiment.js?"


