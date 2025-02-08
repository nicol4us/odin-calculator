
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
    else if(number.value === "0" && element.textContent === "0") {
        number.value = number.value;
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
        firstNumber.isCommaOn = true;
        operator.value = ""
        operator.isActive = false;
        secondNumber.value = "";
        secondNumber.isActive = false;
        secondNumber.isCommaOn = false;
    }
    else {
        firstNumber.value = number;        
        firstNumber.isActive = false; 
        firstNumber.isCommaOn = true;       
        operator.value = nextOperator
        operator.isActive = true;
        secondNumber.value = "";
        secondNumber.isActive = true;
        secondNumber.isCommaOn = false;
    }
}

// (String, String, String) -> String
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
        firstNumber.isCommaOn = true;
        operator.value = typeOperator;
        operator.isActive = true;
        secondNumber.isActive = true;
        secondNumber.isCommaOn = false;
    }
}

// (String, String) -> Float
// To multiply two number given a string
function multiply(firstNumber, secondNumber) {
    const roundNumber = getRoundNumber("x", firstNumber, secondNumber);    
    return (Number.parseFloat(firstNumber) * Number.parseFloat(secondNumber)).toFixed(roundNumber);
}

// (String, String) -> Float
// To divide two number given a string
function divide(firstNumber, secondNumber) {
    const roundNumber = getRoundNumber("/", firstNumber, secondNumber)    
    return (Number.parseFloat(firstNumber) / Number.parseFloat(secondNumber)).toFixed(roundNumber);
}


// (String, String) -> Float
// To add two number given a string
function add(firstNumber, secondNumber) {
    const roundNumber = getRoundNumber("+", firstNumber, secondNumber)
    return (Number.parseFloat(firstNumber) + Number.parseFloat(secondNumber)).toFixed(roundNumber);
}

// (String, String) -> Float
// To add two number given a string
function substract(firstNumber, secondNumber) {
    const roundNumber = getRoundNumber("-", firstNumber, secondNumber)    
    return (Number.parseFloat(firstNumber) - Number.parseFloat(secondNumber)).toFixed(roundNumber);
}


// (buttonElement, divElement, Object, Object, Object) -> ()
// To reset all Object into initial value
function clearButtonListener(button, displayElement, firstNumber, operator, secondNumber) {
    button.addEventListener("click", function() {
        firstNumber.value = "";
        firstNumber.isActive = true;
        firstNumber.isCommaOn = false;
        operator.value = "";
        operator.isActive = false;
        secondNumber.value = "";
        secondNumber.isActive = false;
        secondNumber.isCommaOn = false;
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


// (buttonElement, divElement, Object, Object, Object)
// To add event listener into comma button
function commaButtonListener(button, displayElement, firstNumber, operator, secondNumber) {
    button.addEventListener("click", function() {
        setCommaButton(whichActive(firstNumber,secondNumber), button);
        displayElement.textContent = displayAll(firstNumber, operator, secondNumber);
    })
}

// (Object, button) -> ()
// To set comma status into True  and disable the button to prevent unneccesary click
function setCommaButton(objectNumber, button) {
    if(!objectNumber.isCommaOn) {
        objectNumber.isCommaOn = true;        
        objectNumber.value = objectNumber.value + button.textContent;
    }
    else {
        objectNumber.value = objectNumber.value;
    }
}

// (String, String, String) -> Number
// To round number for long decimal according to math operation
function getRoundNumber(typeOperation, number1, number2) {
    const getArrayNumberOne = number1.split(".");
    const lengthFirst = (getArrayNumberOne[1] === undefined) ? 0 : getArrayNumberOne[1].length;
    const getArrayNumberTwo = number2.split(".");
    const lengthSecond = (getArrayNumberTwo[1] === undefined) ? 0 : getArrayNumberTwo[1].length;
    switch (typeOperation) {
        case ("x"):
            return lengthFirst + lengthSecond;
        case ("/"):
            return lengthFirst + lengthSecond;
        case ("+"):
            return (lengthFirst <= lengthSecond) ? lengthSecond : lengthFirst;
        case ("-"):
            return (lengthFirst <= lengthSecond) ? lengthSecond : lengthFirst;        
    }

}

// (button, divElement, Object, Object, Object) -> ()
// To activate event listener click into Backspace button to remove one by one character in display
function backSpaceButtonListener(button, display, firstNumber, operator, secondNumber) {
    button.addEventListener("click", function() {
        removeCharacter(firstNumber, operator, secondNumber);
        display.textContent = displayAll(firstNumber,operator, secondNumber);
    })
}


// (Object, Object, Object) -> ()
// To set conditional to remove last character start from third object
function removeCharacter(firstNumber, operator, secondNumber) {
    switch(true) {
        case(secondNumber.isActive && secondNumber.value.length > 0):
            secondNumber.value = secondNumber.value.slice(0, -1);
            break;
        case(secondNumber.isActive && secondNumber.value.length === 0):
            secondNumber.isActive = false;            
            operator.value = operator.value.slice(0,-1);
            operator.isActive = false;
            firstNumber.isActive = true;            
            break;        
        case(firstNumber.isActive):            
            firstNumber.value = firstNumber.value.slice(0,-1);
            break;
    }
}



// Function Call Execution
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

setNumbersListener(allNumbersButton,firstNumber,secondNumber,operator,display);
setOperatorListener(allOperatorButton,firstNumber, secondNumber, operator,display);
clearButtonListener(clearButton, display,firstNumber, operator, secondNumber);
negateButtonListener(negateButton,display,firstNumber,operator, secondNumber);
commaButtonListener(commaButton,display,firstNumber, operator, secondNumber);
backSpaceButtonListener(backspaceButton,display,firstNumber,operator,secondNumber);