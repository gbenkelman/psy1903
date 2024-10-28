let jsPsych = initJsPsych();

let timeline = [];

//Various intros, priming video, likert trial
let broadIntroTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: ` <h1> <span class = 'title'>Welcome to the Harvard Mental Health Stigma IAT!</span></h1>
    <p> In this study, you will complete an implicit association test (IAT). </p> 
    <p> You will be asked to categorize mental and physical health conditions as well as words associated with humanizing and stigmatizing language.</p> 
    <p> In addition to the IAT, you will be asked to watch a short video and answer some questions about your attitudes, beliefs, and demographics.</p>
    <p> There are three parts to this experiment.</p>
    <p> press the <span class = 'key'>SPACE</span> to begin.</p> 
    `,
    choices: [' '],
}
timeline.push(broadIntroTrial);

let specificIntroTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus:
        `<h1> <span class = 'title'>Welcome to the Harvard Mental Health Stigma IAT!</span></h1>
    <p>In this experiment, you will be asked to complete the following three tasks:</p>
    <span class = 'box'>
    <ul>
        <li>In Task 1, you will be asked to watch a short video.</li>
        <li>In Task 2, you will answer a brief series of questions.</li>
        <li>In Task 3, you will be asked to categorize a series of words.</li>
    </ul>
    </span>
    <p> press the <span class = 'key'>SPACE</span> to begin.</p> 
    `,
    choices: [' '],
} //needs work with bullet spacing
timeline.push(specificIntroTrial);

let videoTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: ` 
    <h1> <span class = 'title'>Task 1 of 3</span></h1>
    <p> Please watch the following video </p>
    <iframe width="560" height="315" 
        src="https://www.youtube.com/embed/AYAHkql75qM?si=OVFCmPnPwVTmPB3K" 
        title="YouTube video player" frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media;gyroscope; picture-in-picture; web-share" 
        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
        tabindex="-1">
        </iframe>
    <p> Press the <span class = 'key'>SPACE</span> key when you have completed the video and are ready to move on to the next task. </p>
    `,
    choices: [' '],

} //needs button focus refining 
timeline.push(videoTrial);

//task 2 of 3
let two = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<h1>Task 2 of 3</h1>
    <p>Please answer the following questions.</p>
    <p>Press the <span class=key>SPACE</span class> key to begin.</p>`,
    choices: ' ',
};
timeline.push(two);

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
        { prompt: "There are many resources for mental health issues at Harvard.", labels: likert_scale },
    ],
    randomize_question_order: true,
};
timeline.push(likert);

let three = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<h1>Task 3 of 3</h1>
    <p>In this final task, you will be shown a series of words and asked to sort them into categories.</p>
    <p>Press the <span class=key>SPACE</span class> key to begin.</p>`,
    choices: ' ',
};
timeline.push(three);


jsPsych.run(timeline);

//Beginning the outer loop
//Establishing counter for the four-part block seperation screens
let counter = 1;

for (let block of conditions) {

    // Setting left and right category variables
    let leftCategory = block.categories[0];
    let rightCategory = block.categories[1];

    // Screen with instructions, indicating the two categories
    let blockintroTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
        <h1><span class = 'title'>Part ${counter++} of 4</span></h1> 
        <p> In this part, the two categories will be: <span class = 'bold'>${leftCategory}</span> and <span class = 'bold'>${rightCategory}</span></p>
        <p>If the word you see in the middle of the screen should be sorted into the <span class = 'bold'>${leftCategory}</span> category, press the <span class = 'key'>F</span> key.</p>
        <p>If thee word you see in the middle of the screen should be sorted into the  <span class = 'bold'>${rightCategory}</span> category, press the <span class = 'key'>J</span> key.</p>
        <p> press the <span class = 'key'>SPACE</span> to begin.</p>  
        `,
        choices: [' '],
    }
    timeline.push(blockintroTrial);

    //Trial inner loop
    for (let trial of block.trials) {
        let iatTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `
            <span class= 'category1' > <strong>${leftCategory}</strong> (press F)</span>
            <span class='category2'> <strong>${rightCategory}</strong> (press J)</span>
            <p class='word'>${trial.word}</p>`,
            choices: ['f', 'j'],
            data: {
                collect: true,
                trialType: 'iat',
                word: trial.word,
                expectedCategory: trial.expectedCategory,
                expectedCategoryAsDisplayed: trial.expectedCategoryAsDisplayed,
                leftCategory: leftCategory,
                rightCategory: rightCategory,
            },
            on_finish: function (data) {
                if (data.response == trial.expectedResponse) {
                    iatTrial.data.correct = true;
                } else {
                    iatTrial.data.correct = false;
                }//not finished yet 
            }

        }
        timeline.push(iatTrial);

        //Adding the fixation trial inbetween iaTrials
        let fixationTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `+ `,
            trial_duration: 250,
            choices: ['NO KEY']
        }
        timeline.push(fixationTrial);
    }
}

// Results Trial //
let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: `
        <h1>Please wait...</h1>
        <span class='loader'></span>
        <p>We are saving the results of your inputs.</p>
        `,
    on_start: function () {
        let prefix = 'iat';
        let dataPipeExperimentId = 'Ib1PGFLsDH5z';
        let forceOSFSave = false;

        let results = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'plugin_version', 'collect'])
            .csv();

        let participantId = new Date().toISOString().replace(/T/, '-').replace(/\..+/, '').replace(/:/g, '-');

        let isLocalHost = window.location.href.includes('localhost');

        let destination = '/save';
        if (!isLocalHost || forceOSFSave) {
            destination = 'https://pipe.jspsych.org/api/data/';
        }

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


// Debrief //
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you for your participation!</h1> 
    <p>The experiment is complete. You can now close this tab.</p>
    `,
    choices: ['NO KEYS'],
    on_start: function () {
        let data = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'trial_index', 'plugin_version', 'collect'])
            .csv();
        console.log(data);
    }
};
timeline.push(debriefTrial);

//Running the experiment 
jsPsych.run(timeline);