// main.js

import { History } from './history.js';
import * as math from './math.js';

const keypad = document.getElementById('keypad');

let obj = new History();
let array = [];

function operate(operator, num1, num2) {
    switch (operator) {
        case 'add':
            return math.add(num1, num2);
        case 'subtract':
            return math.subtract(num1, num2);
        case 'multiply':
            return math.multiply(num1, num2);
        case 'divide':
            return math.divide(num1, num2);
        default:
            return 'Oops';
    }
}

keypad.addEventListener('pointerdown', event => {
    // event delegation
    let input = event.target;
    if (input.tagName != 'BUTTON') return;

    // determine if its an operation or a number
    const operation = event.target.id;
    input = input.innerText;

    if (!operation) {
        obj[obj.operand] += input;
    } else {
        switch (operation) {
            case 'clear':
                obj = new History();
                break;
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                obj.operand = 'num2';
                obj.operator = operation;
                break;
            case 'equals':
                obj.result = operate(
                    obj.operator,
                    parseFloat(obj.num1),
                    parseFloat(obj.num2)
                );
                updateDisplay();
                array.push(obj);
                obj = new History();
                break;
            case 'invert':
                obj[obj.operand] = operate(
                    'multiply',
                    parseFloat(obj[obj.operand]),
                    -1
                ).toString();
                break;
            case 'decimal':
                if (!obj.isFloat) {
                    obj[obj.operand] += '.';
                    obj.isFloat = true;
                }
            case 'back':
                obj.removeLastDigit();
        }
    }
    // console.log(array);
    // console.log(obj);
    updateDisplay();
});

// todo:
function updateDisplay() {
    console.log(obj.toString());
}
document.body.onkeydown = function (event) {};
