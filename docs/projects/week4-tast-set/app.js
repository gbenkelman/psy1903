/*
function celsiusToFahrenheit(celcius) {
    return (celcius * 1.8) + 32;
}

console.log(celsiusToFahrenheit(10)); // Expected output: 50
console.log(celsiusToFahrenheit(-5)); // 23


function convertTemp(temp, convertTo) {
    if (convertTo == "c") {
        return (temp - 32) / 1.8;
    }

    if (convertTo == "f") {
        return (temp * 1.8) + 32;
    }
}

console.log(convertTemp(10, 'c')); // Expected output: -12.222222222222221
console.log(convertTemp(10, 'f')); // Expected output: 50
*/

/*
let words = ['apple', 'banana', 'cherry', 'pear', 'grape'];

function getWordLengths(words) {
    let lengths = [];
    for (let i = 0; i < words.length; i++) {
        lengths.push(words[i].length);
    }
    return lengths;
}

console.log(getWordLengths(words));

function getLongestWord(words) {
    let longestWord = '';

    for (let i = 0; i < words.length; i++) {
        if (words[i].length > longestWord.length) {
            longestWord = words[i];
        }
    }

    return longestWord;
}

console.log(getLongestWord(words));
*/
/*
function getOddNumbers(numbers) {

    let oddNumbers = [];

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] % 2 !== 0) {
            oddNumbers.push(numbers[i]);
        }
    }

    return oddNumbers;
}

// ex:
console.log(getOddNumbers([1, 2, 3, 4, 5])); // Expected output: [1, 3, 5]
console.log(getOddNumbers([12, 45, 10, 11, 61])); // 

*/

function filterNumbers(numbers, evenOrOdd) {
    let numbers1 = [];

    for (let i = 0; i < numbers.length; i++) {
        if (evenOrOdd === 'even') {
            if (numbers[i] % 2 === 0) {
                numbers1.push(numbers[i]);
            }
        } else if (evenOrOdd === 'odd') {
            if (numbers[i] % 2 !== 0) {
                numbers1.push(numbers[i]);
            }
        }
    }

    return numbers1;
}

// Ex:
console.log(filterNumbers([1, 2, 3, 4, 5], 'even')); // Expected output: [2, 4]
console.log(filterNumbers([1, 2, 3, 4, 5], 'odd')); // Expected output: [1, 3, 5]

console.log(filterNumbers([45, 10, 11, 61], 'even')); // Expected output: [10]
console.log(filterNumbers([45, 10, 11, 61], 'odd')); // Expected output: [45, 11, 61]
