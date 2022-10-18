document.addEventListener("keydown", populateDisplay);

function populateDisplay(e){


    if(!isNaN(e.key)&&(!isNaN(displayNumbers.innerText))){
        displayNumbers.innerText += e.key;
    }
}


const buttons = Array.from(document.querySelectorAll("button"));
buttons.forEach(button => button.addEventListener("click", getSelectedBtn));

const opButtons = Array.from(document.querySelectorAll(".op"));

const displayNumbers = document.querySelector(".display-numbers");
const period = document.querySelector(".period");

let num = 0;
let i = 0;
let result = 0;
let operator = "ga";
let ans = false;
function removeColor() {
    opButtons.forEach(function (button) {
        button.removeAttribute("class");
        button.classList.add("button-sign");
        button.classList.add("op");
    })
}

function operate(operator, num1, num2) {
    if (operator === "+") {
        result = Number(displayNumbers.innerText) + num;
    }
    else if (operator === "-") {
        result = num - Number(displayNumbers.innerText);
    }
    else if (operator === "x") {
        result = num * Number(displayNumbers.innerText);
    }
    else if (operator === "/") {
        result = num / Number(displayNumbers.innerText);
    }
    displayNumbers.innerText = result;
    return result;
}

function getSelectedBtn() {
    const selectedBtn = document.querySelector(".op-selected");
    if(ans==true){
        displayNumbers.innerText = "";
        ans = false;
    }
    if (this.getAttribute("class") === "button-sign red CA") {
        displayNumbers.innerText = "";
        num = 0;
        removeColor();
    }

    if (((selectedBtn != null) && (!isNaN(this.innerText))) || (this.innerText === "-")) {
        if (i === 0 && displayNumbers.innerText !== "-") {
            displayNumbers.innerText = "";
        }
    }
    if (!isNaN(this.innerText)) {
        displayNumbers.innerText += this.innerText;
        i++;
        removeColor();
    }
    else {
        if ((displayNumbers.innerText === "")) {
            if (this.innerText === "-") {
                displayNumbers.innerText = "-";

            }
            if (this.innerText === ".") {
                displayNumbers.innerText = "0.";
            }
        }
        else if ((displayNumbers.innerText !== "-") && (selectedBtn == null)) {
            removeColor();
            if (this.getAttribute("class") === "button-sign op") {
                this.classList.add("op-selected");
                if (num !== 0) {
                    operate(operator, num, displayNumbers.innerText);
                }
                num = Number(displayNumbers.innerText);
                operator = this.innerText;
            }
            else if (this.getAttribute("class") === "button-sign period") {
                const numArray = (displayNumbers.innerText).split("");
                if (!numArray.includes(".")) {
                    displayNumbers.innerText += ".";
                }
            }
            else if (this.getAttribute("class") === "button-sign red CO") {
                const numArray = (displayNumbers.innerText).split("");
                numArray.pop();
                displayNumbers.innerText = numArray.join("");
            }
            else if (this.getAttribute("class") === "button-sign equal") {
                const answer = operate(operator, num, displayNumbers.innerText);
                displayNumbers.innerText = `Respuesta: ${answer}`;
                ans = true;
                num = 0;
            }

        }
        i = 0;
    }
}

