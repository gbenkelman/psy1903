let num1 = Math.floor(Math.random() * 10) + 1;
let num2 = Math.floor(Math.random() * 10) + 1;
let correctAnswer = num1 + num2;

// Display the random numbers inside the spans on the page
document.getElementById('num1').textContent = num1;
document.getElementById('num2').textContent = num2;

// Start timer when the page loads
let startTime = Date.now();

// Reference the form and results section
let form = document.getElementsByTagName('form')[0];
let results = document.getElementById('results');

// Listen for the form to be submitted
form.addEventListener('submit', function (event) {
    // Prevent the default form submission (page reload)
    event.preventDefault();

    // Collect the user's response
    let response = form.elements['response'].value;

    // End the timer when the form is submitted
    let endTime = Date.now();
    let reactionTime = ((endTime - startTime) / 1000).toFixed(2); // Convert to seconds

    // Check if the user's response is correct
    let feedback = '';
    if (parseInt(response) === correctAnswer) {
        feedback = 'Correct!';
    } else {
        feedback = 'Incorrect. The correct answer is ' + correctAnswer + '.';
    }

    // Report the results to the user
    results.innerHTML = `
        ${feedback}<br>
        You answered in ${reactionTime} seconds!
    `;

    // Hide the form after submission
    form.style.display = 'none';
});