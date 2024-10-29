let jsPsych = initJsPsych({
    show_progress_bar: true
});

let timeline = [];

// Welcome Trial //
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the Trustworthiness Rating Task</h1>
    <p>You will see a series of faces. Pay attention as the faces pop up on the screen."</p>
    <p>Press SPACE to begin.</p>
`,
    choices: [' '],
}
timeline.push(welcomeTrial);

// Define animation stimuli array
var animation_sequence = [
    'images/img1.png',
    'images/img2.png',
    'images/img3.png',
    'images/img4.png',
    'images/img5.png',
    'images/img6.png',
    'images/img7.png',
    'images/img8.png',
    'images/img9.png'
];

var animation_trial = {
    type: jsPsychAnimation,
    stimuli: animation_sequence,
    sequence_reps: 3,
    frame_time: 300,
    prompt: '<p>Watch the faces.</p>',
};
timeline.push(animation_trial);

// Debrief and end screen
let debrief = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<h1>Thank you for participating!</h1><p>Press any key to complete the experiment.</p>`
};
timeline.push(debrief);

// Run the experiment timeline
jsPsych.run(timeline);
