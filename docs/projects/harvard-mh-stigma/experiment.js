let jsPsych = initJsPsych();

let timeline = [];

// Welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the Harvard Mental Health Task!</h1> 
    <p>In this experiment, you will be shown a series of words and asked to categorize them.</p>
    <p>There are four parts to this experiment.</p>
    <p>Press <span class='key'>SPACE</span> to move on to the first set of instructions.</p>
    `,
    choices: [' '],
};

timeline.push(welcomeTrial);

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
        { prompt: "I feel comfortable expressing my feelings.", labels: likert_scale },
        { prompt: "I feel that my mental health is valued at Harvard.", labels: likert_scale },
        { prompt: "At Harvard, I feel like I belong.", labels: likert_scale },
        { prompt: "Mental Health is something that should be taken seriously.", labels: likert_scale },
        { prompt: "It is normal to have issues with mental health.", labels: likert_scale },
        { prompt: "Physical health issues", labels: likert_scale },
    ],
    randomize_question_order: true
};
timeline.push(likert);


for (let block of conditions) {

    // Screen with instructions, indicating the two categories
    // and the expected keys to be pressed
    let leftCategory = block.categories[0];
    let rightCategory = block.categories[1];

    for (let trial of block.trials) {
        // Screen that displays trial.word in the center
        // as well as the left/right categories
        // listening for key response (f,j)
        // on_finish: process the response, store the appropriate data

        let example = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `...`,
            data: {
                collect: true,
                trialType: 'iat',
                word: trial.word,
                expectedCategory: trial.expectedCategory,
                expectedCategoryAsDisplayed: trial.expectedCategoryAsDisplayed,
                leftCategory: leftCategory,
                rightCategory: rightCategory
            },
            on_finish: function (data) {
                // if data.response == trial.expectedResponse
                // data.correct = true
                // else
                // data.correct = false
            }
        }
        timeline.push(example);
    }
}

jsPsych.run(timeline);