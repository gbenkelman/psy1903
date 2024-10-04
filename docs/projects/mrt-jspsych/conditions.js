let jsPsych = initJsPsych();

//create timeline
let timeline = [];

//first part of experiment, welcome
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the Math Response Time Task!</h1>
    <p>In this experiment, you will solve simple math problems as quickly and accurately as possible.</p>
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