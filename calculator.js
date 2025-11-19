let display = document.getElementById("display");
let currentInput = "";

function appendValue(value) {
    if (currentInput === "0" && value !== ".") {
        currentInput = value;
    } else {
        currentInput += value;
    }
    display.innerText = currentInput;
}

function clearDisplay() {
    currentInput = "";
    display.innerText = "0";
}

function delDisplay() {
    currentInput = "";
    display.innerText = "";
}


function calculate() {
    try {
        currentInput = eval(currentInput).toString();
        display.innerText = currentInput;
    } catch {
        display.innerText = "Pleas Entre Valid Value";
        currentInput = "";
    }
}

const texts = ["CALCULATOR"];
document.getElementById("heading").textContent = texts[0];