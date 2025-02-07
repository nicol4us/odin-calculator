
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
let firstNumber = {value : "", isActive : true, isCommaOn : false};
let operator = {value: "", isActive : false};
let secondNumber = {value : "", isActive : false, isCommaOn : false};



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
        if(firstNumber.isActive) {
            return firstNumber;
        }
        else if (secondNumber.isActive) {
            return secondNumber;
        }
        else return null;    
}

// (Object, buttonElement) -> ()
// To add number into display
function setNumber(number, element) {
    if(number === null || number === undefined) {
        number.value = number.value ;
    }
    else {
        number.value = number.value + element.textContent;
    }
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
            setOperationLogic(firstNumber,operator,secondNumber,button.textContent, displayElement)

            displayElement.textContent = displayAll(firstNumber,operator, secondNumber);
        })
    })
}

// (String, Object, Object, Object, String)
// To set condition for mathematical operation to work
function setOperationLogic(firstNumber, operator, secondNumber, nextOperator, displayElement){
    if(operator.isActive && secondNumber.isActive && secondNumber.value.length > 0) {
        calculate(firstNumber,operator, secondNumber, nextOperator)
    }
    else if(firstNumber.isActive&& firstNumber.value.length > 0 || !firstNumber.isActive && !operator.isActive) {
        setOperator(firstNumber,operator,secondNumber,nextOperator);    }      
    else {
        displayElement.textContent = "ERORR";
    }
}

// (String, Object, Object, Object) -> ()
// To calculate two Object according to the type of operator calculation a
function calculate(firstNumber, operator, secondNumber, nextOperator) {    
    switch(nextOperator) {
        case "x":
            setVariableStatus(operate(operator.value, firstNumber.value, secondNumber.value), firstNumber, operator, secondNumber, "x");            
            break;
        case "/":
            setVariableStatus(operate(operator.value, firstNumber.value, secondNumber.value), firstNumber, operator, secondNumber, "/");
            break;
        case "+":
            setVariableStatus(operate(operator.value, firstNumber.value, secondNumber.value), firstNumber, operator, secondNumber, "+");
            break;
        case "-":
            setVariableStatus(operate(operator.value, firstNumber.value, secondNumber.value), firstNumber, operator, secondNumber, "-");
            break;
        case "=":
            setVariableStatus(operate(operator.value, firstNumber.value, secondNumber.value), firstNumber, operator, secondNumber, "");
            break;
    }

}

// (Float, Object, Object, Object) -> ()
// To update variable of firstNumber, operator and secondNumber
function setVariableStatus(number, firstNumber, operator, secondNumber, nextOperator) {
    if(nextOperator.length === 0) {
        firstNumber.value = number;
        firstNumber.isActive = false;
        operator.value = ""
        operator.isActive = false;
        secondNumber.value = "";
        secondNumber.isActive = false;
    }
    else {
        firstNumber.value = number;        
        firstNumber.isActive = false;        
        operator.value = nextOperator
        operator.isActive = true;
        secondNumber.value = "";
        secondNumber.isActive = true;
    }
}

// (String, String, String) -> Number
// To compute two number given string accroding to type of operation and return it as number
function operate(operatorType, firstNumber, secondNumber) {
    switch(operatorType) {
        case "x":
            return multiply(firstNumber, secondNumber);
            
        case "/":
            return divide(firstNumber, secondNumber);
            
        case "+":
            return add(firstNumber, secondNumber);
            
        case "-":
            return substract(firstNumber, secondNumber);
            
    }
}

// (Object, Object, Object, String) -> ()
// To update variable of firstNumber, operator and secondNumber
function setOperator(firstNumber, operator, secondNumber, typeOperator) {
    if(typeOperator === "=") {
        operator.value = "";
        operator.isActive = false;

    }    
    else {
        firstNumber.isActive = false;
        operator.value = typeOperator;
        operator.isActive = true;
        secondNumber.isActive = true;
    }
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


// (buttonElement, divElement, Object, Object, Object) -> ()
// To reset all Object into initial value
function clearButtonListener(button, displayElement, firstNumber, operator, secondNumber) {
    button.addEventListener("click", function() {
        firstNumber.value = "";
        firstNumber.isActive = true;
        operator.value = "";
        operator.isActive = false;
        secondNumber.value = "";
        secondNumber.isActive = false;
        displayElement.textContent = displayAll(firstNumber, operator, secondNumber);
    })
}


// (buttonElement, divElement, Object, Object, Object) -> ()
// To add event listener into negate button
function negateButtonListener(button, displayElement, firstNumber, operator, secondNumber) {
    button.addEventListener("click", function() {
        negateNumber(whichActive(firstNumber, secondNumber));

        displayElement.textContent = displayAll(firstNumber, operator, secondNumber);
    })
}


// (object) -> ()
// To negate number
function negateNumber(numberObject) {
    numberObject.value = (Number.parseFloat(numberObject.value) * -1).toString();
}


// (buttonElement, divElement, Object, Object)
// To add event listener into comma button
function commaButtonListener(button, displayElement, firstNumber, secondNumber) {
    button.addEventListener("click", function() {
        setComma(whichActive(firstNumber,secondNumber));
    })
}



// Function Call Execution
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

setNumbersListener(allNumbersButton,firstNumber,secondNumber,operator,display);
setOperatorListener(allOperatorButton,firstNumber, secondNumber, operator,display);
clearButtonListener(clearButton, display,firstNumber, operator, secondNumber);
negateButtonListener(negateButton,display,firstNumber,operator, secondNumber);