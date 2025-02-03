
// Constant Declaration
// +++++++++++++++++++++++++++++++++++++++++++++++++++++
const allNumbersButton = Array.from(document.querySelectorAll(".number"));
const allOperatorButton = Array.from(document.querySelectorAll(".operator"));
const display = document.querySelector("#display");
const clearButton = document.querySelector("#clear");
const backspaceButton = document.querySelector("#backspace"); 
const negateButton = document.querySelector("#negate");
const commaButton = document.querySelector("#comma");


// Variable Declarations
// +++++++++++++++++++++++++++++++++++++++++++++++++++++
let firstNumber = {value : "", isActive : true};
let operator = {value: "", isActive : false};
let secondNumber = {value : "", isActive : false};



// Functions Declarations
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++

// (ArrayButtonElement, Object, Object, Object, divElement) -> ()
// To active click button on Number and show it in display
function setNumbersListener(arrayNumber, firstNumber, secondNumber, operator, displayElement) {
    arrayNumber.forEach(element => {
        element.addEventListener("click", function() {
            setNumber(whichActive(firstNumber, secondNumber), element);            
            displayElement.textContent = displayAll(firstNumber, operator, secondNumber);
            
        })
    });
}

// (Object, Object) -> Object
// Return which object is active
function whichActive(firstNumber, secondNumber) {
    return (secondNumber.isActive) ? secondNumber : firstNumber;
}

// (Object, buttonElement) -> ()
// To add number into display
function setNumber(number, element) {
    number.value = number.value + element.textContent;
}


// (Object, Object, Object) -> String
// To concatenate all string value object and return it
function displayAll(firstNumber, operator, secondNumber) {
    return firstNumber.value + operator.value + secondNumber.value;
}

// (ArrayButtonElement, Object, Object, Object, divElement) -> ()
// To active click button on Number and show it in display
function setOperatorListener(arrayOperator, firstNumber, secondNumber, operator, displayElement) {
    arrayOperator.forEach(element => {
        element.addEventListener("click", function() {
            setOperation(firstNumber, operator, secondNumber, element.textContent);
            displayElement.textContent = displayAll(firstNumber,operator, secondNumber);
        })
    })
}

// (Object, Object, Object, String) -> ()
// To set function for each operator and display it if neccassery
function setOperation(firstNumber, operator, secondNumber, typeOperator) {
    switch(typeOperator) {
        case "x":
            (operator.isActive) ? calculate(firstNumber.value, operator.value, secondNumber.value) : setVariableOperation(operator, "x");
            break;
    }
}


setNumbersListener(allNumbersButton,firstNumber,secondNumber,operator,display);