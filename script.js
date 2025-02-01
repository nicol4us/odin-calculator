
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
function setNumbersListener(arrayNumber, firstNumber, secondNumber, displayElement) {
    arrayNumber.forEach(element => {
        element.addEventListener("click", function() {
            setNumberToDisplay(checkFirstNumberAndSecondNumber(firstNumber, secondNumber), element, displayElement)
        })
    });
}

