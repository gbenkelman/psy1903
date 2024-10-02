let jsPsych = initJsPsych();

let timeline = [];

// Welcome Screen
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the Math Response Time Task!</h1>
    <p>In this experiment, you will solve simple math problems as quickly and accurately as possible.</p>
    <p>Press SPACE to begin.</p>`,
    choices: [' '],
};
timeline.push(welcomeTrial);

// Create Random Conditions
let conditions = [];
for (let i = 0; i < 3; i++) {
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    let answer = num1 + num2;
    conditions.push({ num1: num1, num2: num2, answer: answer });
};

console.log(conditions);

