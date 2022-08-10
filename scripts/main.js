// lol isNaN('') is false
// lot of special cases getting kinda ugly lol
import { Calculator } from './calculator.js';

new Calculator(
    document.getElementById('keypad'),
    document.getElementById('display')
);