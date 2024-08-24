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
        output += btnValue;
    }
    display.value = output
}

buttons.forEach((button) => {
    button.addEventListener('click', (e) => calculate(e.target.dataset.value));
})

// Fuction to change themes

const themeButtons = document.querySelectorAll('.theme-btn');

themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const theme = button.dataset.theme;
        document.body.className = theme + '-theme';
    });
});