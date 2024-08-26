const display = document.querySelector('.calculator .display');
const buttons = document.querySelectorAll('.calculator .buttons button');
const specialChars = ["%", "*", "/", "+", "-", "="];
let output = "";

// Define fuction to calculate based on button clicked.
const calculate = (btnValue) => {
    if(btnValue === "=" && output !== ""){
        // If output has '%', replace with '/100' before evaluating.
        output = eval(output.replace("%", "/100"))
    } else if (btnValue === "AC") {
        output = ""
    } else if (btnValue === "DEL") {
        // Removes the last character from the output
        output = output.slice(0, -1)
    } else {
        if(output === "" && specialChars.includes(btnValue)) return;
// Check if the last character is an operator and the new input is also an operator
        if(specialChars.includes(btnValue) && specialChars.includes(output[output.length - 1])) {
    // Replace the last operator with the new one
    output = output.slice(0, -1) + btnValue;
        } else {
            output += btnValue;
        }
    }
    display.value = output
}

buttons.forEach((button) => {
    button.addEventListener('click', (e) => calculate(e.target.dataset.value));
})

// Keyboard support
document.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        calculate('=');
    } else if(e.key === 'Backspace') {
        calculate('DEL');
    } else if(e.key === 'Escape') {
        calculate('AC');
    // } else if(e.key === 'Tab') {
    //     calculate('AC');
    //  
    } else if(/[\d%*\/+\-.]/.test(e.key)) {
        calculate(e.key);
    } else if (e.key === '.') {
        calculate('0.');
    } else if(e.key === '0' || e.key === 'NumPad0') {
        calculate('0');
    } else if(e.key === '1' || e.key === 'NumPad1') {
        calculate('1');
    } else if(e.key === '2' || e.key === 'NumPad2') {
        calculate('2');
    } else if(e.key === '3' || e.key === 'NumPad3') {
        calculate('3');
    } else if(e.key === '4' || e.key === 'NumPad4') {
        calculate('4');
    } else if(e.key === '5' || e.key === 'NumPad5') {
        calculate('5');
    } else if(e.key === '6' || e.key === 'NumPad6') {
        calculate('6');
    } else if(e.key === '7' || e.key === 'NumPad7') {
        calculate('7');
    } else if(e.key === '8' || e.key === 'NumPad8') {
        calculate('8');
    } else if(e.key === '9' || e.key === 'NumPad9') {
        calculate('9');
    } else if(e.key === '.' || e.key === 'NumpadDecimal') {
        calculate('.');
    } else if(e.key === '+' || e.key === 'NumpadAdd') {
        calculate('+');
    } else if(e.key === '-' || e.key === 'NumpadSubtract') {
        calculate('-');
    } else if(e.key === '*' || e.key === 'NumpadMultiply') {
        calculate('*');
    } else if(e.key === '/' || e.key === 'NumpadDivide') {
        calculate('/');
    } else if(e.key === '%') {
        calculate('%');
    }
});

// Fuction to change themes

const themeButtons = document.querySelectorAll('.theme-btn');

themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const theme = button.dataset.theme;
        document.body.className = theme + '-theme';
    });
});