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
}

for (let condition of conditions) {
    let conditionTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `<h1>${condition.characters}</h1>`,

        // Listen for either the f or j key to proceed
        choices: ['f', 'j'],
    };

    timeline.push(conditionTrial);
}

// Debrief and Output Data
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<h1>Thank you for participating!</h1>
               <p>You can close this tab now.</p>`,
    choices: jsPsych.NO_KEYS,
    on_start: function () {
        let results = jsPsych.data.get().map(trial => ({
            rt: trial.rt,
            response: trial.response.response,
            time_elapsed: trial.time_elapsed,
            correct: trial.correct,
            num1: trial.num1,
            num2: trial.num2,
            answer: trial.answer
        }));
        console.log(results);
    }
};
timeline.push(debriefTrial);

// Run the Experiment
jsPsych.run(timeline);




/* // Initialize jsPsych
let jsPsych = initJsPsych();

let timeline = [];

// Define a welcome trial using jsPsych’s jsPsychHtmlKeyboardResponse plugin
let welcomeTrial = {
    // Indicate the plugin type we’re using
    type: jsPsychHtmlKeyboardResponse,

    // What stimulus to display on the screen
    stimulus: `
    <h1>Welcome to the Math Response Time Task!</h1> 
    <p>You are about to see a series of math equations.</p>
    <p>Answer each question as quickly and as accurately as possible.</p>
    <p>Press SPACE to begin.</p>
    `,
    // Listen for the SPACE key to be pressed to proceed
    choices: [' '],
};

timeline.push(welcomeTrial);
jsPsych.run(timeline);

let conditions = [
    { num1: (Math.floor(Math.random() * 10) + 1), num2: (Math.floor(Math.random() * 10) + 1), answer: (num1 + num2) },
    { num1: (Math.floor(Math.random() * 10) + 1), num2: (Math.floor(Math.random() * 10) + 1), answer: (num1 + num2) },
    { num1: (Math.floor(Math.random() * 10) + 1), num2: (Math.floor(Math.random() * 10) + 1), answer: (num1 + num2) },
];

console.log(condtitions);



/* let num1 = Math.floor(Math.random() * 10) + 1;
let num2 = Math.floor(Math.random() * 10) + 1;
let answer1 = (num1 + num2);
//create conditions
let num1 = Math.floor(Math.random() * 10) + 1;
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
];
console.log(conditions);
 */
/*
let num1 = Math.floor(Math.random() * 10) + 1;
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



// Loop through the conditions to create trials
for (let condition of conditions) {
    // Create a math trial for each condition
    let mathTrial = {
        type: jsPsychSurveyText,
        questions: [{ prompt: `What is ${condition.num1} + ${condition.num2}?`, columns: 5 }],
        data: { correct_answer: condition.answer },
        on_finish: function (data) {
            let response = parseInt(data.response.Q0);
            let correct = (response === condition.answer);
            data.correct = correct;
            data.reaction_time = data.rt / 1000; // Convert from ms to seconds
        }
    };

/*    {
       title: 'Part 2',
           count: 4,
               conditions: [
                   { characters: 'food', isWord: true },
                   { characters: 'burn', isWord: true },
                   { characters: 'mnut', isWord: false },
                   { characters: 'plut', isWord: false },
               ]
   }
   {
       title: 'Part 3',
           count: 5,
               conditions: [
                   { characters: 'apple', isWord: true },
                   { characters: 'jumps', isWord: true },
                   { characters: 'pilde', isWord: false },
                   { characters: 'kandy', isWord: false },
               ]
   },
];

   // Shuffle the conditions
   conditions = jsPsych.randomization.repeat(conditions, 1);

   for (let block of conditions) {
       let blockConditions = jsPsych.randomization.repeat(block.conditions, 1);

       let blockIntroTrial = {
           type: jsPsychHtmlKeyboardResponse,
           stimulus: `
           <h1>${block.title}</h1>
           <p>You are about to see a series of ${block.count} characters.</p>
           <p>If the characters make up a word, press the F key.</p>
           <p>If the characters do not make up a word, press the J key.</p>
           <p>Press SPACE to begin.</p>
           `,
           choices: [' '],
       };
       timeline.push(blockIntroTrial);

       for (let condition of blockConditions) {
           let conditionTrial = {
               type: jsPsychHtmlKeyboardResponse,
               stimulus: `<h1>${condition.characters}</h1>`,
               choices: ['f', 'j'],
               data: {
                   collect: true,
                   characters: condition.characters,
                   blockId: block.title
               },
               on_finish: function (data) {
                   if (data.response == 'f' && condition.isWord === true) {
                       data.correct = true;
                   } else if (data.response == 'j' && condition.isWord === false) {
                       data.correct = true;
                   } else {
                       data.correct = false;
                   }
               }
           }
           timeline.push(conditionTrial);
       }
   }

   // Debrief trial (only once at the end)
   let debriefTrial = {
       type: jsPsychHtmlKeyboardResponse,
       stimulus: `
   <h1>Thank you!</h1>
   <p>You can now close this tab</p>
   `,
       choices: [], // No response required
       on_start: function () {
           let data = jsPsych.data
               .get()
               .filter({ collect: true })
               .ignore(['stimulus', 'trial_type', 'trial_index', 'plugin_version', 'collect'])
               .csv();
           console.log(data);  // Logs the data
       }
   };
   timeline.push(debriefTrial);

   // Run the experiment after timeline is set up
   jsPsych.run(timeline);
*/