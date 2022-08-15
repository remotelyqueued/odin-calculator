// calculator.js

class Data {
    constructor() {
        this.x = '';
        this.y = '';
        this.op = '';
    }
}

// used this.previous.y to store last operation; equals chaining
// it will either be empty or '='
// this.previous.op stores last operator
export class Calculator {
    constructor(elem, display) {
        this.elem = elem;
        this.display = display;
        this.current = new Data();
        this.previous = new Data();

        // issues with audio: firefox windows 11
        this.key1 = document.getElementById('key1');
        this.key2 = document.getElementById('key2');
        this.morty = document.getElementById('morty');

        elem.onpointerdown = this.onPointerDown.bind(this);
        elem.onkeydown = this.onKeyDown.bind(this);
    }

    number(innerText) {
        // handles text in current after dividing by 0 and 3 + . resetting
        if (!isFinite(this.current.x) && this.current.x !== '.') {
            this.current.x = innerText;
        } else {
            this.current.x += innerText;
        }
    }

    operator(innerText) {
        // handles 3 + 3 = =
        this.previous.y = '';
        // handles "" + ""
        if (!this.current.x && !this.current.y) {
            return;
        }
        // handles . + .
        if (isNaN(this.current.x)) {
            return;
        }
        if (this.current.x && this.current.y) {
            this.compute();
            // handles result + x = xresult +
            this.current.op = innerText;
            this.current.y = this.current.x;
            this.current.x = '';
            return;
        }
        // handles ++++
        if (!this.current.op.includes(innerText)) {
            this.current.op = innerText;
            // handles 3 + 3 + ... .03.032 + 02-248
            if (!this.current.y) {
                this.current.y = this.current.x;
                this.current.x = '';
            }
        }
    }

    equals(innerText) {
        // handles 3 + . =, = NaN
        if (innerText === this.previous.y && this.previous.x) {
            this.current.x = `${this.operate(
                this.previous.op,
                parseFloat(this.current.x),
                parseFloat(this.previous.x)
            )}`;
        } // handles 3 = or 3 + =
        else if (!this.current.y || !this.current.x) {
            return;
        } else {
            this.previous.op = this.current.op;
            // handles 3 + . =, = NaN
            this.current.x === '.'
                ? (this.previous.x = '')
                : (this.previous.x = this.current.x);
            this.previous.y = '=';
            this.compute();
        }
    }

    compute() {
        // handles 3 + decimal
        if (isNaN(parseFloat(this.current.x))) return;
        // divion by 0
        if (parseFloat(this.current.x) === 0 && this.current.op === '÷') {
            this.current.x = 'Bruh';
            this.morty.currentTime = 0;
            this.morty.play();
            // handles division by 0 text in current ending up in previous
            this.previous = new Data();
        } else {
            this.current.x = `${this.operate(
                this.current.op,
                parseFloat(this.current.y),
                parseFloat(this.current.x)
            )}`;
        }
        this.current.y = '';
        this.current.op = '';
    }

    ac() {
        this.display.innerText = '';
        this.current = new Data();
        this.previous = new Data();
    }

    invert() {
        // handles inverting an empty string, "."
        if (isNaN(parseFloat(this.current.x))) return;
        this.current.x = `${this.operate(
            'x',
            parseFloat(this.current.x),
            parseFloat('-1')
        )}`;
    }

    back() {
        if (this.current.x) {
            this.current.x = this.current.x.slice(0, -1);
            // handles negative sign left in current after invert
            if (this.current.x === '-') this.current.x = '';
            // handles empty screen = NaN after calculation
            if (!this.current.x) this.previous.y = '';
            // current and op are empty start removing previous
        } else if (!this.current.x && !this.current.op) {
            return;
        } else if (!this.current.x) {
            // handles 3 + back back
            this.current.op = '';
            this.current.x = this.current.y;
            this.current.y = '';
        }
    }

    decimal() {
        // handles multiple '.'
        if (this.current.x.includes('.')) return;
        this.current.x += '.';
    }

    updateDisplay() {
        // if x and y don't exist screen should be blank
        if (!this.current.x && !this.current.y) {
            this.display.innerText = '';
            // if y exists print y first - op and x
        } else if (this.current.y) {
            this.display.innerText = `${this.numberWithCommas(
                this.current.y
            )} ${this.current.op} ${this.numberWithCommas(this.current.x)}`;
            // if x exists print x and op if it's there
        } else if (this.current.x) {
            this.display.innerText = `${this.numberWithCommas(
                this.current.x
            )} ${this.current.op}`;
        }
    }

    // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
    // handles long decimals without inserting commas in decimal places
    // note to self: learn regex lol
    numberWithCommas(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    }

    operate(operator, num1, num2) {
        let result;
        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case 'x':
                result = num1 * num2;
                break;
            case '÷':
                result = num1 / num2;
                break;
            default:
                return NaN;
        }
        return Math.round(result * 1000) / 1000;
    }

    playAudio(action) {
        if (action === 'equals' || action === 'Enter') {
            this.key2.currentTime = 0;
            this.key2.play();
        } else {
            this.key1.currentTime = 0;
            this.key1.play();
        }
    }

    onKeyDown(event) {
        // firefox in linux search box pops up on when pressing / over keypad
        event.preventDefault();
        const keyCodes = [
            '+',
            '-',
            'x',
            '*',
            '/',
            '=',
            'Backspace',
            '.',
            'Enter',
        ];

        if (keyCodes.includes(event.key)) {
            switch (event.key) {
                case '+':
                case '-':
                    this.operator(event.key);
                    break;
                case 'x':
                case '*':
                    this.operator('x');
                    break;
                case '/':
                    this.operator('÷');
                    break;
                case '=':
                case 'Enter':
                    this.equals('=');
                    break;
                case 'Backspace':
                    this.back();
                    break;
                case '.':
                    this.decimal();
                    break;
            }
        } else if (event.key >= '0' && event.key <= '9') {
            this.number(event.key);
        } else {
            return false;
        }
        // todo:
        // some of the buttons innertext is not = to event.key
        // this.elem.querySelectorAll('button').forEach(button => {
        //     if (button.innerText === event.key)
        //         button.classList.toggle('active');
        // });

        // okKeyDown: add class
        // todo: bind onKeyUp - remove/swap class
        this.playAudio(event.key);
        this.updateDisplay();
    }

    onPointerDown(event) {
        let action = event.target.dataset.action;
        if (action) {
            this[action](event.target.innerText);
            this.playAudio(action);
            this.updateDisplay();
        }
    }
}
