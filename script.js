
// Constant Declaration
// +++++++++++++++++++++++++++++++++++++++++++++++++++++
const allNumbersButton = Array.from(document.querySelectorAll(".number"));
const allOperatorButton = Array.from(document.querySelectorAll(".function"));
const display = document.querySelector("#display");




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
            console.log(firstNumber);
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

