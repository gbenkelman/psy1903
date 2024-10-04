let jsPsych = initJsPsych();

let timeline = [];

// Welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the Math Response Time Task!</h1>
    <p>In this experiment, you will solve simple math problems as quickly and accurately as possible.</p>
    <p>There will be three blocks of three trials, with increasing difficulty.</p>
    <p>This first block is the easiest, adding two numbers between 0 and 10.</p>
    <p>Press SPACE to begin.</p>`,
    choices: [' '],
};
timeline.push(welcomeTrial);

let part1Conditions = [];
for (let i = 0; i < 3; i++) {
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    let answer = num1 + num2;
    part1Conditions.push({ num1: num1, num2: num2, answer: answer });
}

let part2Conditions = [];
for (let i = 0; i < 3; i++) {
    let num1 = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
    let num2 = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
    let answer = num1 + num2;
    part2Conditions.push({ num1: num1, num2: num2, answer: answer });
}

let part3Conditions = [];
for (let i = 0; i < 3; i++) {
    let num1 = Math.floor(Math.random() * (30 - 20 + 1)) + 20;
    let num2 = Math.floor(Math.random() * (30 - 20 + 1)) + 20;
    let answer = num1 + num2;
    part3Conditions.push({ num1: num1, num2: num2, answer: answer });
}

let conditions = [
    {
        title: 'Part 1',
        conditions: part1Conditions
    },
    {
        title: 'Part 2',
        conditions: part2Conditions
    },
    {
        title: 'Part 3',
        conditions: part3Conditions
    }
];

for (let block of conditions) {
    let blockConditions = jsPsych.randomization.repeat(block.conditions, 1);

    let blockIntroTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
            <h1>${block.title}</h1>
            <p>Press SPACE to begin.</p>
            `,
        choices: [' '],
    };
    timeline.push(blockIntroTrial);

    // Add trials for each condition in the block
    for (let condition of blockConditions) {
        let conditionTrial = {
            type: jsPsychSurveyHtmlForm,
            html: `<p>${condition.num1} + ${condition.num2} = </p>
                   <input name="response" type="number" required></input>`,
            data: {
                collect: true,
                num1: condition.num1,
                num2: condition.num2,
                answer: condition.answer
            },
            on_finish: function (data) {
                data.num1 = condition.num1;
                data.num2 = condition.num2;
                data.answer = condition.answer;
                //correct or  not?
                let userResponse = data.response.response;
                if (userResponse == condition.answer) {
                    data.correct = true;
                }
                else {
                    data.correct = false;
                }
            }
        };
        timeline.push(conditionTrial);
    }
}

// Final debriefing trial
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you for participating!</h1> 
    <p>You can close this tab.</p>
    `,
    choices: jsPsych.NO_KEYS,
    on_start: function () {
        let data = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['response', 'stimulus', 'trial_type', 'trial_index', 'plugin_version', 'collect'])
            .csv();
        console.log(data);
    }
};

timeline.push(debriefTrial);

// Run the experiment after timeline is set up
jsPsych.run(timeline);

/*
let jsPsych = initJsPsych();

let timeline = [];

// Welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the Math Response Time Task!</h1>
    <p>In this experiment, you will solve simple math problems as quickly and accurately as possible.</p>
        <p>There will be three blocks of three trials, with increasing difficulty.</p>
            <p>This first block is the easiest, adding two numbers between 0 and 10.</p>
    <p>Press SPACE to begin.</p>`,
    choices: [' '],
};
timeline.push(welcomeTrial);

// Show word or pseudo word (on repeat)
// Create an array of conditions
let part1Conditions = [];
for (let i = 0; i < 3; i++) {
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    let answer = num1 + num2;
    part1Conditions.push({ num1: num1, num2: num2, answer: answer });
};

let part2Conditions = [];
for (let i = 0; i < 3; i++) {
    let num1 = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
    let num2 = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
    let answer = num1 + num2;
    part1Conditions.push({ num1: num1, num2: num2, answer: answer });
}

let part3Conditions = [];
for (let i = 0; i < 3; i++) {
    let num1 = Math.floor(Math.random() * (30 - 20 + 1)) + 20;
    let num2 = Math.floor(Math.random() * (30 - 20 + 1)) + 20;
    let answer = num1 + num2;
    part1Conditions.push({ num1: num1, num2: num2, answer: answer });
}


let conditions = [
    {
        title: 'Part 1',
        conditions: part1Conditions
    },
    {
        title: 'Part 2',
        conditions: part2Conditions
    },
    {
        title: 'Part 3',
        conditions: part3Conditions
    }
];

// Shuffle the conditions
conditions = jsPsych.randomization.repeat(conditions, 1);

for (let block of conditions) {
    let blockConditions = jsPsych.randomization.repeat(block.conditions, 1);

    let blockIntroTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
            <h1>${block.title}</h1>
            <p>Press SPACE to begin.</p>
            `,
        choices: [' '],
    };
    timeline.push(blockIntroTrial);

    let debriefTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
        <h1>Thank you for participating!</h1> 
        <p>You can close this tab.</p>
        `,
        choices: ['NO KEYS'],
        on_start: function () {
            let data = jsPsych.data
                .get()
                .filter({ collect: true })
                .ignore(['response', 'stimulus', 'trial_type', 'trial_index', 'plugin_version', 'collect'])
                .csv();
            console.log(data);
        }
    };

    timeline.push(debriefTrial);
    jsPsych.run(timeline);


/* let jsPsych = initJsPsych();

//create timeline
let timeline = [];

//first part of experiment, welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the Math Response Time Task!</h1>
    <p>In this experiment, you will solve simple math problems as quickly and accurately as possible.</p>
        <p>There will be three blocks of three trials, with increasing difficulty.</p>
            <p>This first block is the easiest, adding two numbers between 0 and 10.</p>
    <p>Press SPACE to begin.</p>`,
    choices: [' '],
};
timeline.push(welcomeTrial);

let conditions = [];
for (let i = 0; i < 3; i++) {
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    let answer = num1 + num2;
    conditions.push({ num1: num1, num2: num2, answer: answer });
};

console.log(conditions);

conditions = jsPsych.randomization.repeat(conditions, 1);

for (let condition of conditions) {
    let conditionTrial = {
        type: jsPsychSurveyHtmlForm,
        html: `<p>${condition.num1} + ${condition.num2} = </p>
               <input name="response" type="number" required></input>`,
        data: {
            collect: true,
        },
        on_finish: function (data) {
            data.num1 = condition.num1;
            data.num2 = condition.num2;
            data.answer = condition.answer;
            //correct or  not?
            let userResponse = data.response.response;
            if (userResponse == condition.answer) {
                data.correct = true;
            }
            else {
                data.correct = false;
            }
        }
    };
    timeline.push(conditionTrial);
}

let secondTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Block 2!</h1>
    <p>This second block will be a bit harder, adding two numbers between 10 and 20.</p>
    <p>Press SPACE to begin.</p>`,
    choices: [' '],
};
timeline.push(secondTrial);

let conditions2 = [];
for (let i = 0; i < 3; i++) {
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    let answer = num1 + num2;
    conditions2.push({ num1: num1, num2: num2, answer: answer });
};

console.log(conditions2);

conditions2 = jsPsych.randomization.repeat(conditions2, 1);

for (let conditions2 of conditions2) {
    let conditionTrial2 = {
        type: jsPsychSurveyHtmlForm,
        html: `<p>${condition2.num1} + ${condition2.num2} = </p>
               <input name="response" type="number" required></input>`,
        data: {
            collect: true,
        },
        on_finish: function (data) {
            data.num1 = condition.num1;
            data.num2 = condition.num2;
            data.answer = condition.answer;
            //correct or  not?
            let userResponse = data.response.response;
            if (userResponse == condition.answer) {
                data.correct = true;
            }
            else {
                data.correct = false;
            }
        }
    };
    timeline.push(conditionTrial2);
}


let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you for participating!</h1> 
    <p>You can close this tab.</p>
    `,
    choices: ['NO KEYS'],
    on_start: function () {
        let data = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['response', 'stimulus', 'trial_type', 'trial_index', 'plugin_version', 'collect'])
            .csv();
        console.log(data);
    }
};

timeline.push(debriefTrial);

jsPsych.run(timeline); */