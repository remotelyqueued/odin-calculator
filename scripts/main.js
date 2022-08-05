// main.js

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(operator, num1, num2) {}

// buttons: +, -, *, /, equals, digits, clear
// display

document.body.onkeydown = function (event) {
    // update display
};

// const main = document.body.querySelector('main');
const display = document.getElementById('display');
const keypad = document.getElementById('keypad');
const buttons = document.querySelectorAll('button');

let obj = {
    x: 0,
    y: 0,
};

function equation(string) {
    let split = string.split('');
    // deal with whitespace

    const re = /\d/;

}

equation('2 + 2');

// regex
// if not a number else

// todo: create function to handle keydown and button click

keypad.addEventListener('pointerdown', event => {
    let elem = event.target;

    // if (elem.textContent.length > 1) return;
    if (elem.tagName != 'BUTTON') return;

    if (elem.innerText === '=') {
        // send string
    } else if (elem.innerText === 'clear') {
        display.innerText = '';
    }
    switch (elem.innerText) {
        case 'clear':
            display.innerText = '';
            obj = {
                x: 0,
                y: 0,
            };
            break;
        case '+':
            // store the numbers entered until this point
            break;
        case '-':
            break;
        case '*':
            break;
        case '/':
            break;
        case '=':
            // or just send the whole thing and parse it lol
            break;
        default:
            display.innerText += elem.innerText;
            break;
    }
});
