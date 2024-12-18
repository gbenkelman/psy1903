let jsPsych = initJsPsych();

let timeline = [];

// added space bar thing
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1 class="teal">Welcome to the Math Response Time Task!</h1>
    <p>In this experiment, you will solve simple math problems as quickly and accurately as possible.</p>
    <p>There will be three blocks of three trials, with increasing difficulty.</p>
    <p>This first block is the easiest, adding two numbers between 0 and 10.</p>
    <p>Press <span class='key'>SPACE</span> to begin.</p>`,
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
//new here:
var likert_scale = [
    "Strongly Disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly Agree"
];

let likert = {
    type: jsPsychSurveyLikert,
    questions: [
        { prompt: "I enjoy solving math problems.", labels: likert_scale },
        { prompt: "I find math easy.", labels: likert_scale },
    ],
    randomize_question_order: true
};
timeline.push(likert);

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

    // changed format of questions
    for (let condition of blockConditions) {
        let conditionTrial = {
            type: jsPsychSurveyHtmlForm,
            html: `<p><span class='num'> <span class='numbers'>${condition.num1}</span> + <span class='numbers'>${condition.num2}</span> =</span> </p>
                   <input name="response" type="number" ></input>`,
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

let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: `
        <h1>Please wait...</h1>
        <p>We are saving the results of your inputs.</p>
        `,
    on_start: function () {
        let prefix = 'mrt';
        let dataPipeExperimentId = 'your-experiment-id-here';
        let forceOSFSave = false;

        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'plugin_version', 'collect'])
            .csv();

        // Generate a participant ID based on the current timestamp
        let participantId = new Date().toISOString().replace(/T/, '-').replace(/\..+/, '').replace(/:/g, '-');

        // Dynamically determine if the experiment is currently running locally or on production
        let isLocalHost = window.location.href.includes('localhost');

        let destination = '/save';
        if (!isLocalHost || forceOSFSave) {
            destination = 'https://pipe.jspsych.org/api/data/';
        }

        // Send the results to our saving end point
        fetch(destination, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
            body: JSON.stringify({
                experimentID: dataPipeExperimentId,
                filename: prefix + '-' + participantId + '.csv',
                data: results,
            }),
        }).then(data => {
            console.log(data);
            jsPsych.finishTrial();
        })
    }
}
timeline.push(resultsTrial);

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

