
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


/*
function getWordLengths(words) {
    let lengths = [];
    for (let i = 0; i < words.length; i++) {
        lengths.push(words[i].length);
    }
    return lengths;
}

let words = ['apple', 'banana', 'cherry', 'pear', 'grape'];
console.log(getWordLengths(words)); // Expected output: [5, 6, 6, 4, 5]


function getLongestWord(words) {
    let longestWord = '';

    for (let i = 0; i < words.length; i++) {
        if (words[i].length > longestWord.length) {
            longestWord = words[i];
        }
    }

    // Return the longest word after the loop
    return longestWord;
}


let words = ['apple', 'banana', 'cherry', 'pear', 'grape'];
console.log(getLongestWord(words));
return lengths;

*/