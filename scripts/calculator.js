// calculator.js
export class Calculator {
    constructor(elem, display) {
        this.elem = elem;
        this.display = display;
        this.current = '';
        this.previous = '';
        this.op = '';
        this.priorOperand = '';
        this.priorOp = '';
        this.eq = '';
        elem.onclick = this.onClick.bind(this);
    }

    number(innerText) {
        // handles lol and 3 + . resetting
        if (!isFinite(this.current) && this.current !== '.') {
            this.current = innerText;
        } else {
            this.current += innerText;
        }
    }

    operator(innerText) {
        // handles "" + ""
        this.eq = innerText;
        if (!this.current && !this.previous) return;
        // if current and previous exist don't change operator
        if (this.current && this.previous) return;
        // handles . + .
        if (isNaN(this.current)) return;
        // handles ++++
        if (!this.op.includes(innerText)) {
            this.op = innerText;
            // handles 3 + 3 + ..end up with .03.032 + 02-248
            if (!this.previous) {
                this.previous = this.current;
                this.current = '';
            }
        }
    }

    equals(innerText) {
        if (innerText === this.eq) {
            this.current = `${this.operate(
                this.priorOp,
                parseFloat(this.current),
                parseFloat(this.priorOperand)
            )}`;
        } // handles 3 = or 3 + =
        else if (!this.previous || !this.current) {
            return;
        } else {
            this.priorOp = this.op;
            this.priorOperand = this.current;
            this.eq = '=';
            this.compute();
        }
    }

    compute() {
        // handles 3 + .
        if (isNaN(parseFloat(this.current))) return;
        // divion by 0
        if (parseFloat(this.current) === 0 && this.op === '÷') {
            this.current = 'lol';
            // handles after "lol" from division by 0
            this.eq = '';
        } else {
            this.current = `${this.operate(
                this.op,
                parseFloat(this.previous),
                parseFloat(this.current)
            )}`;
        }
        this.previous = '';
        this.op = '';
    }

    ac() {
        this.display.innerText = '';
        this.current = '';
        this.previous = '';
        this.op = '';
        this.priorOp = '';
        this.priorOperand = '';
        this.eq = '';
    }

    invert() {
        // handles inverting an empty string
        if (isNaN(parseFloat(this.current))) return;
        // would prefer to handle all operations in compute
        this.current = `${this.operate(
            'x',
            parseFloat(this.current),
            parseFloat('-1')
        )}`;
    }

    back() {
        if (this.current) {
            this.current = this.current.slice(0, -1);
            // handles - left in current after invert
            if (this.current === '-') this.current = '';
            // current and op are empty start removing previous
        } else if (!this.current && !this.op) {
            return;
        } else if (!this.current) {
            this.op = '';
            this.current = this.previous;
            this.previous = '';
        }
    }

    decimal() {
        // if decimal in current
        if (this.current.includes('.')) return;
        this.current += '.';
    }

    updateDisplay() {
        if (this.previous) {
            this.display.innerText = `${this.previous} ${this.op} ${this.current}`;
        } else if (!this.previous && !this.current) {
            this.display.innerText = '';
        } else if (!this.previous) {
            this.display.innerText = `${this.current} ${this.op}`;
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
        }
    }
}
