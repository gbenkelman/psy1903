// let response = prompt('What is your name?');
// let count = response.length;
// alert(count);
// let firstLetter = response.charAt(0);
// alert(firstLetter);
// let lastLetter = response.charAt(count - 1);
// alert(lastLetter);

let count = 8;
console.log(count % 2 == 0);

let a = 5;
let b = 10;
console.log(a > 3 && b < 15);

let over18 = false;
let hasGuardianApproval = true;
console.log(over18 || hasGuardianApproval);

// Create variables to store references to elements on the page
let form = document.getElementsByTagName('form')[0];
let results = document.getElementById('results');
//let equation = document.getElementById('equation');

let num1output = document.getElementById('num1');
let num2output = document.getElementById('num2');


let num1 = (Math.floor(Math.random() * 10) + 1);
let num2 = (Math.floor(Math.random() * 10) + 1);

console.log(num1);
console.log(num2);

num1output.innerHTML = num1;
num2output.innerHTML = num2;


//not showing up on my website
//equation.innerHTML = 'What is' + num1 + '+' + num2 + '?';


// Listen for the form to be submitted
form.addEventListener('submit', function (event) {

    ////stop the timer here

    // Prevent the default form submission b
    event.preventDefault();

    // Collect the response
    let response = form.elements['response'].value;

    // Report the results
    results.innerHTML = 'Hello ' + response + '!';

    //hide the form incl instructions
    form.style.display = 'none';
});

