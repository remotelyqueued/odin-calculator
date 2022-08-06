// main.js

const display = document.getElementById('display');
const keypad = document.getElementById('keypad');
const buttons = document.querySelectorAll('button');

class Result {
    letructor() {
        this.num1 = '';
        this.num2 = '';
        this.result = 0;
        this.operand = 'num1';
        this.operator = '';
    }
}

function equation(string) {
    let split = string.split('');
    // deal with whitespace

    const re = /\d/;

}

equation('2 + 2');

let obj = new Result();
let array = [];

function operate(operator, num1, num2) {
    let result;
    switch (operator) {
        case 'add':
            result = add(num1, num2);
            break;
        case 'subtract':
            result = subtract(num1, num2);
            break;
        case 'multiply':
            result = multiply(num1, num2);
            break;
        case 'divide':
            result = divide(num1, num2);
            break;
        default:
            console.log('Oops');
            break;
    }
    return result;
}

keypad.addEventListener('pointerdown', event => {
    let input = event.target;

    if (input.tagName != 'BUTTON') return;

    const operation = event.target.id;
    input = input.innerText;

    // todo: if obj.operand == num2 push?
    if (!operation) {
        obj[obj.operand] += input;
        display.innerText += input;
    } else {
        switch (operation) {
            case 'clear':
                obj = new Result();
                display.innerText = '0';
                break;
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                obj.operand = 'num2';
                obj.operator = operation;
                display.innerText += input;
                break;
            case 'equals':
                obj.result = operate(
                    obj.operator,
                    Number(obj.num1),
                    Number(obj.num2)
                );
                display.innerText += input + obj.result;
                array.push(obj);
                obj = new Result();
                break;
            case 'invert': // multiply obj.num by -1
            case 'decimal': // insert decimal into obj.num
            case 'back': // remove from obj.num
        }
    }
    console.log(array);
    console.log(obj);
});
>>>>>>> 5f2a95ac44cf2aac04c7bb471e34262fc304580a

// todo:
document.body.onkeydown = function (event) {};

// math functions
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
