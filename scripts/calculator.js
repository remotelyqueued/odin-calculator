// calculator.js

class Data {
    constructor() {
        this.x = '';
        this.y = '';
        this.op = '';
    }
}

export class Calculator {
    constructor(elem, display) {
        this.elem = elem;
        this.display = display;

        this.current = new Data();
        this.previous = new Data();

        elem.onclick = this.onClick.bind(this);
    }

    number(innerText) {
        // handles lol and 3 + . resetting
        if (!isFinite(this.current.x) && this.current.x !== '.') {
            this.current.x = innerText;
        } else {
            this.current.x += innerText;
        }
    }

    operator(innerText) {
        // handles "" + ""
        this.previous.y = innerText;
        if (!this.current.x && !this.current.y) return;
        // if current and previous exist don't change operator
        if (this.current.x && this.current.y) return;
        // handles . + .
        if (isNaN(this.current.x)) return;
        // handles ++++
        if (!this.current.op.includes(innerText)) {
            this.current.op = innerText;
            // handles 3 + 3 + ..end up with .03.032 + 02-248
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
        // handles 3 + .
        if (isNaN(parseFloat(this.current.x))) return;
        // divion by 0
        if (parseFloat(this.current.x) === 0 && this.current.op === '÷') {
            this.current.x = 'lol';
            // handles after "lol" from division by 0
            this.previous.y = '';
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
        // handles inverting an empty string
        if (isNaN(parseFloat(this.current.x))) return;
        // would prefer to handle all operations in compute
        this.current.x = `${this.operate(
            'x',
            parseFloat(this.current.x),
            parseFloat('-1')
        )}`;
    }

    back() {
        if (this.current.x) {
            this.current.x = this.current.x.slice(0, -1);
            // handles - left in current after invert
            if (this.current.x === '-') this.current.x = '';
            // current and op are empty start removing previous
        } else if (!this.current.x && !this.current.op) {
            return;
        } else if (!this.current.x) {
            this.current.op = '';
            this.current.x = this.current.y;
            this.current.y = '';
        }
    }

    decimal() {
        // if decimal in current
        if (this.current.x.includes('.')) return;
        this.current.x += '.';
    }

    updateDisplay() {
        if (this.current.y) {
            this.display.innerText = `${this.current.y} ${this.current.op} ${this.current.x}`;
        } else if (!this.current.y && !this.current.x) {
            this.display.innerText = '';
        } else if (!this.current.y) {
            this.display.innerText = `${this.current.x} ${this.current.op}`;
        }
    }

    // required by assignment
    operate(operator, num1, num2) {
        switch (operator) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case 'x':
                return num1 * num2;
            case '÷':
                return num1 / num2;
            default:
                return operator;
        }
    }

    onKeyDown() {}
    onClick(event) {
        let action = event.target.dataset.action;
        if (action) {
            this[action](event.target.innerText);
            this.updateDisplay();
            console.log(this.current);
            console.log(this.previous);
        }
    }
}
