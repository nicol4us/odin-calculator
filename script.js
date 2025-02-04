
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
    arrayOperator.forEach(button => {
        button.addEventListener("click", function() {
            setOperationLogic(operator.value,firstNumber,operator,secondNumber,button.textContent)
            displayElement.textContent = displayAll(firstNumber,operator, secondNumber);
        })
    })
}

// (String, Object, Object, Object, String)
// To set condition for mathematical operation to work
function setOperationLogic(operatorType, firstNumber, operator, secondNumber, nextOperator){
    if(operator.isActive && secondNumber.isActive) {
        calculate(operatorType, firstNumber,operator, secondNumber, nextOperator)
    }
    else {
        setOperator(firstNumber,operator,secondNumber,nextOperator);
    }
}

// (String, Object, Object, Object) -> ()
// To calculate two Object according to the type of operator calculation a
function calculate(typeOperator, firstNumber, operator, secondNumber, nextOperator) {
    switch(typeOperator) {
        case "x":
            setVariableStatus(multiply(firstNumber.value, secondNumber.value), firstNumber, operator, secondNumber, nextOperator);            
            break;
        case "/":
            setVariableStatus(divide(firstNumber.value, secondNumber.value), firstNumber, operator, secondNumber, nextOperator);
            break;
        case "+":
            setVariableStatus(add(firstNumber.value, secondNumber.value), firstNumber, operator, secondNumber, nextOperator);
            break;
        case "-":
            setVariableStatus(substract(firstNumber.value, secondNumber.value), firstNumber, operator, secondNumber, nextOperator);
            break;
    }

}

// (Float, Object, Object, Object) -> ()
// To update variable of firstNumber, operator and secondNumber
function setVariableStatus(number, firstNumber, operator, secondNumber, nextOperator) {
    if(nextOperator === "=") {
        firstNumber.value = number.toFixed(4);
        firstNumber.isActive = false;
        operator.value = ""
        operator.isActive = false;
        secondNumber.value = "";
        secondNumber.isActive = false;
    }
    else {
        firstNumber.value = number.toFixed(4);
        firstNumber.isActive = false;
        operator.value = nextOperator
        operator.isActive = true;
        secondNumber.value = "";
        secondNumber.isActive = true;
    }
}

// (Object, Object, Object, String) -> ()
// To update variable of firstNumber, operator and secondNumber
function setOperator(firstNumber, operator, secondNumber, typeOperator) {
    firstNumber.isActive = false;
    operator.value = typeOperator;
    operator.isActive = true;
    secondNumber.isActive = true;
}

// (String, String) -> Float
// To multiply two number given a string
function multiply(firstNumber, secondNumber) {
    return Number.parseFloat(firstNumber) * Number.parseFloat(secondNumber);
}

// (String, String) -> Float
// To divide two number given a string
function divide(firstNumber, secondNumber) {
    return Number.parseFloat(firstNumber) / Number.parseFloat(secondNumber);
}


// (String, String) -> Float
// To add two number given a string
function add(firstNumber, secondNumber) {
    return Number.parseFloat(firstNumber) + Number.parseFloat(secondNumber);
}

// (String, String) -> Float
// To add two number given a string
function substract(firstNumber, secondNumber) {
    return Number.parseFloat(firstNumber) - Number.parseFloat(secondNumber);
}

setNumbersListener(allNumbersButton,firstNumber,secondNumber,operator,display);
setOperatorListener(allOperatorButton,firstNumber, secondNumber, operator,display);