/* let randomNumber1 = Math.floor(Math.random() * 10) + 1;
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

let age = prompt('How old are you?');
if (age < 12) {
    alert('Child');
}
if (age >= 12 && age < 18) {
    alert('Teenager');
}
if (age >= 18) {
    alert('Adult');
} */

let whole = prompt('Type a whole number');
if (whole % 2 == 0) {
    alert('Even!');
}
if (whole % 2 != 0) {
    alert('Odd!');
}