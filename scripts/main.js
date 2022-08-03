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

const obj = {
    x: 0,
    y: 0,
};

// regex
// if not a number else
buttons.forEach(button => {
    button.addEventListener('click', event => {
        switch (event.target.innerText) {
            case 'clear':
                display.innerText = '';
                break;
            case '+':
                break;
            case '-':
                break;
            case '*':
                break;
            case '/':
                break;
            case '=':
                break;
            default:
                display.innerText += event.target.innerText;
                break;
        }
    });
});
