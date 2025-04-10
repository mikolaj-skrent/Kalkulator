const display = document.querySelector('.calculator-screen');         //wyswietlacz kalkulatora
const buttons = document.querySelectorAll(".calculator-keys>button");   //przciski kalkulatora

let currentOperator = null;  
let operand1 = null;      
let operand2 = null;   
let cacheValue = "";          

buttons.forEach((button) => {
    if (button.classList.contains('operator')) {
        button.addEventListener('click', (e) => {     //klikanie
            if (cacheValue !== "") {
                if (operand1 === null) {
                    operand1 = parseFloat(cacheValue); 
                    cacheValue = "";  
                } else {
                    operand2 = parseFloat(cacheValue);  
                    equal(); 
                    operand1 = parseFloat(display.innerText); 
                }
            }
            currentOperator = e.target.value;  
        });
    } else if (button.classList.contains('decimal')) {         //przecinek
        button.addEventListener('click', () => {
            if (!cacheValue.includes(".")) {
                cacheValue += ".";  
                setDisplayValue(cacheValue);
            }
        });
    } else if (button.classList.contains('all-clear')) {      //ac
        button.addEventListener('click', () => {
            clearDisplay();
        });
    } else if (button.classList.contains('equal-sign')) {     //znak rowna sie
        button.addEventListener('click', () => {
            if (cacheValue !== "") {
                operand2 = parseFloat(cacheValue);  
                equal(); 
            }
        });
    } else {
        button.addEventListener('click', (e) => {
            cacheValue += e.target.value;
            setDisplayValue(cacheValue); 
        });
    }
});

function setDisplayValue(value) {
    display.innerText = value;
}

function clearDisplay() {         
    cacheValue = "";
    operand1 = null;
    operand2 = null;
    currentOperator = null;
    setDisplayValue("");
}

function equal() {
    let result;
    
    if (operand1 !== null && operand2 !== null && currentOperator !== null) {
        switch (currentOperator) {
            case "+":
                result = operand1 + operand2;   //dodawanie
                break;
            case "-":
                result = operand1 - operand2;   //odejmowanie
                break;
            case "*":
                result = operand1 * operand2;// mnożenie
                break;
            case "/":
                if (operand2 === 0) {                    // dzielenie

                    result = "Error";  
                } else {
                    result = operand1 / operand2;
                }
                break;
            default:
                return;
        }
        
        setDisplayValue(result.toString());
        operand1 = result;  
        operand2 = null;
        currentOperator = null;
        cacheValue = "";
    }
}
    // Sprawdź, jaki operator został wybrany jako ostatni i czy została podana liczba, wtedy wykonaj działanie ostatniego operatora.
    // Jeśli nie podano liczby, a kliknięto operator, wyświetl wartość z pamięci podręcznej (cache).


// Metoda/funkcja mnożenia

// Metoda/funkcja dzielenia

// Metoda/funkcja dodawania liczb zmiennoprzecinkowych: dodawany jest przecinek, a wartości float muszą zawierać kropkę (np. 1.2 zamiast 1,2).

// Te zmienne nie są wykorzystywane. Dodaje się do nich przyciski z kalkulatora, ale potem nie są używane.
// Pasowałoby je usunąć z kodu.
// let buttonNum = [];
// let buttonOperator = [];
// let buttonFunction = [];

// Gdy wszystko będzie działać, dopisz komentarze wyjaśniające działanie kodu oraz udokumentuj go w plikach Markdown dokumentacji:
// https://github.com/Code-V-Craft/Documentation
// Ten kod powinien być w Moduł 0: Kalkulator