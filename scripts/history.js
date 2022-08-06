// history.js
export class History {
    constructor() {
        this.num1 = '';
        this.num2 = '';

        this.operand = 'num1';
        this.operator = '';

        this.result = 0;

        this.isFloat = false;
    }

    operatorToSymbol() {
        switch (this.operator) {
            case 'add':
                return '+';
            case 'subtract':
                return '-';
            case 'multiply':
                return '*';
            case 'divide':
                return '/';
            default:
                return '';
        }
    }

    removeLastDigit() {
        this[this.operand] = this[this.operand].slice(0, -1);
    }

    toString() {
        if (this.result) {
            return `${this.num1} ${this.operatorToSymbol()} ${this.num2} = ${
                this.result
            }`;
        } else {
            return `${this.num1} ${this.operatorToSymbol()} ${this.num2}`;
        }
    }
}
