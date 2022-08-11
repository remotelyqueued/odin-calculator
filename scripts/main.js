// lol isNaN('') is false
// lot of special cases ... phew
import { Calculator } from './calculator.js';

// setCapture warning firefox linux from vs code server
// no warning on nginx
new Calculator(document.body, document.getElementById('display'));
