let currentInput = '0';
let previousInput = '';
let selectedOperator = null;
let shouldResetDisplay = false;

const display = document.getElementById('display');

function updateDisplay() {
    display.innerText = currentInput;
}

function appendNumber(number) {
    if (currentInput === '0' || shouldResetDisplay) {
        currentInput = number;
        shouldResetDisplay = false;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function setOperator(operator) {
    if (selectedOperator !== null && !shouldResetDisplay) {
        calculate();
    }
    previousInput = currentInput;
    selectedOperator = operator;
    shouldResetDisplay = true;
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    selectedOperator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

// core mathematical operations requested in requirements
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return b === 0 ? 'Error' : a / b; }

function calculate() {
    if (selectedOperator === null || shouldResetDisplay) return;

    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    let result = 0;

    switch (selectedOperator) {
        case '+': result = add(num1, num2); break;
        case '-': result = subtract(num1, num2); break;
        case '×': result = multiply(num1, num2); break;
        case '÷': result = divide(num1, num2); break;
        default: return;
    }

    currentInput = String(result);
    selectedOperator = null;
    shouldResetDisplay = true;
    updateDisplay();
}

// Extra Credit: Keyboard Input Handling
window.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9') appendNumber(event.key);
    if (event.key === '+') setOperator('+');
    if (event.key === '-') setOperator('-');
    if (event.key === '*') setOperator('×');
    if (event.key === '/') {
        event.preventDefault(); // prevents quick-find browser hotkey
        setOperator('÷');
    }
    if (event.key === 'Enter' || event.key === '=') calculate();
    if (event.key === 'Escape' || event.key.toLowerCase() === 'c') clearDisplay();
});
