let randomNumber1 = Math.floor(Math.random() * 10) + 1;
let randomNumber2 = Math.floor(Math.random() * 10) + 1;
let answer = randomNumber1 + randomNumber2;

let response = prompt('What is ' + randomNumber1 + '+' + randomNumber2 + '?');

let feedback = '';

if (response == answer) {
    feedback = 'Correct!';
} else if (response == answer + 1 || response == answer - 1) {
    feedback = 'You were close!';
} else {
    feedback = 'Incorrect.';
}

alert(feedback + ' The expected answer is ' + answer + '.');