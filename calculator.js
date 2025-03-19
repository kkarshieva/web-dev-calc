const numbersArr = Array.from(document.getElementsByClassName("number"));
const operatorsArr = Array.from(document.getElementsByClassName("operator"));
const parenthesisArr = Array.from(document.getElementsByClassName("parenthesis"));
const decimalButton = document.querySelector(".decimal");
const clearButton = document.querySelector(".clear");
const numberStrs = "0123456789".split("");

const data = {
displayString: "0",
appendStringNum: (newChar) => {
    if (newChar === ".") {
        if (["+", "-", "*", "/", "(", ")","."].includes(data.displayString.slice(-1))) {
            return;  
        }
        data.displayString += newChar;
    }

    if (numberStrs.includes(newChar)) {
        if (data.displayString === "0") {
            data.displayString = "";
        }
        data.displayString += newChar;
    }
    data.updateDisplay();
},

appendStringOperator: (newChar) => {
    if (numberStrs.includes(data.displayString.slice(-1)) || data.displayString.slice(-1) === ")") {
    data.displayString += newChar;
    }
    data.updateDisplay();
},

appendStringParenthesis: (newChar) => {
    if (newChar === ")") {
    if (data.displayString.split("(").length <= data.displayString.split(")").length) {
        //if there are not enough open parenthesis to add a closing parenthesis terminate early
        return;
    }
    if (operatorsArr.map((operator) => operator.innerText).includes(data.displayString[data.displayString.length - 1])) {
        //early termination for adding parenthesis after operator
        return;
    }
    }
    if (data.displayString === "0") {
    data.displayString = "";
    data.displayString += newChar;
    return;
    }

    data.displayString += newChar;

    data.updateDisplay();
},
updateDisplay: () => {
    const display = document.getElementById("display");
    display.innerText = data.displayString;
},
};

const display = document.getElementById("display");
display.innerText = data.displayString;

numbersArr.map((elem, i) => {
elem.addEventListener("click", (evt) => {
    data.appendStringNum(elem.innerText);
});
});

operatorsArr.map((elem, i) => {
elem.addEventListener("click", (evt) => {
    data.appendStringOperator(elem.innerText);
});
});

parenthesisArr.map((elem, i) => {
elem.addEventListener("click", (evt) => {
    data.appendStringParenthesis(elem.innerText);
});
});

decimalButton.addEventListener("click", () => {
    data.appendStringNum(".");
}
);

clearButton.addEventListener("click", () => {
    data.displayString = "0"; 
    data.updateDisplay();
});

function calculateResult() {
    try {
        data.displayString = eval(data.displayString).toString();
    } catch (error) {
        data.displayString = "error"; 
    }
    data.updateDisplay();
}

document.querySelector(".equals").addEventListener("click", calculateResult);

// const numberButtons = document.querySelectorAll(".number_button");
// const data = {
//   runningSum: "",
// };

// function updateView(elementId) {
//   document.getElementById(elementId).textContent = data.runningSum;
//   console.log("updating view", data.runningSum);
// }

// function updateRunningSum(value) {
//   data.runningSum += value;
//   updateView("runningSum");
// }

// numberButtons.forEach((button) => {
//   button.addEventListener("click", (e) => {
//     updateRunningSum(e.target.textContent);
//   });
// });
