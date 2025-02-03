
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
            (operator.isActive && secondNumber.isActive) ? calculate(operator.value, firstNumber,operator, secondNumber) : setOperator(firstNumber,operator,secondNumber,button.textContent);
            displayElement.textContent = displayAll(firstNumber,operator, secondNumber);
        })
    })
}

// (String, Object, Object, Object) -> ()
// To calculate two Object according to the type of operator calculation a
function calculate(typeOperator, firstNumber, operator, secondNumber) {
    switch(typeOperator) {
        case "x":
            setVariableStatus(multiply(firstNumber.value, secondNumber.value), firstNumber, operator, secondNumber);            
            break;
        case "/":
            setVariableStatus(divide(firstNumber.value, secondNumber.value), firstNumber, operator, secondNumber);
            break;
        case "+":
            setVariableStatus(add(firstNumber.value, secondNumber.value), firstNumber, operator, secondNumber);
            break;
        case "-":
            setVariableStatus(sbustract(firstNumber.value, secondNumber.value), firstNumber, operator, secondNumber);
            break;
    }

}

// (Float, Object, Object, Object) -> ()
// To update variable of firstNumber, operator and secondNumber
function setVariableStatus(number, firstNumber, operator, secondNumber) {
    firstNumber.value = number;
    firstNumber.isActive = false;
    operator.value = ""
    operator.isActive = false;
    secondNumber.value = "";
    secondNumber.isActive = false
}

// (Object, Object, Object, String) -> ()
// To update variable of firstNumber, operator and secondNumber
function setOperator(firstNumber, operator, secondNumber, typeOperator) {
    firstNumber.isActive = false;
    operator.value = typeOperator;
    operator.isActive = true;
    secondNumber.isActive = true;
}


setNumbersListener(allNumbersButton,firstNumber,secondNumber,operator,display);