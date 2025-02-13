const display = document.querySelector('.calculator-screen');

const buttons = document.querySelectorAll(".calculator-keys>button");

let buttonNum = [];           // Tablica przechowująca przyciski liczb
let buttonOperator = [];      // Tablica przechowująca przyciski operatorów
let buttonFunction = [];      // Tablica przechowująca przyciski funkcyjne
let cache = [];               // Tablica przechowująca wartości wprowadzone przez użytkownika
let cacheValue =  "";         // Przechowuje bieżącą wartość wprowadzoną przez użytkownika
buttons.forEach((button) => {
    if(button.classList.contains('operator')) {
        buttonOperator.push(button);
        const operator = button.value;
        switch(operator) {
            case '+': // dodawanie
                button.addEventListener('click', (e) => {
                    if (cacheValue !== "") {
                        add(parseFloat(cacheValue));
                    }
                });
                break;
            case '-': // odejmowanie
                button.addEventListener('click', (e) => {
                    if (cacheValue !== "") {
                        subtract(parseFloat(cacheValue));
                    }
                });
                break;
            case '*':
                button.addEventListener('click', (e) => {
                    // mnożenie
                    if (cacheValue !== "") {
                        multiply(parseFloat(cacheValue));
                    }
                });
                break;
            case '/':
                button.addEventListener('click', (e) => {
                    // dzielenie
                    if (cacheValue !== "") {
                        split(parseFloat(cacheValue));
                    }
                });
                    break;
            case ',':
                button.addEventListener('click', (e) => {
                    // przecinek
                    if (cacheValue !== "") {
                        split(parseFloat(cacheValue));
                    }

                    
                });
                break;
                case '=':
                button.addEventListener('click', (e) => {
                    // znak równości
                    if (cacheValue !== "") {
                        split(parseFloat(cacheValue));
                    }

                    
                });
                break;
        }
    }else if(button.classList.contains('decimal')) {
        
    }else if(button.classList.contains('all-clear')) {
        buttonFunction.push(button);
        button.addEventListener('click', (e) => {
            clearDisplay();
            cache = [];
        });
    }else if(button.classList.contains('equal-sign')) {
        buttonFunction.push(button);
        button.addEventListener('click', (e) => {
            equal();
        });
    }else {
        buttonNum.push(button);
        buttonFunction.push(button);
        button.addEventListener('click', (e) => {
            setDisplayValue(e.target.value);
            console.log(e.target.value);
        });
    }

});


function setDisplayValue(value) {
    
    display.innerText += value;
    console.log("value:"+value)
    cacheValue += value;
}
function clearDisplay() {
    display.innerText = "";
    cacheValue = "";
}
let test = true;    // dodawanie
function add(a) {
    cache.push(a);
    console.log(cache);
    if(cache.length >= 2) {
        clearDisplay();
        let sum = cache[0] + cache[1];
        cache = [];
        cache.push(sum);
        setDisplayValue(cache);
    }
    else {
        clearDisplay();
    }
}
function subtract(a) {  // odejmowanie
    cache.push(a);
    console.log(cache);
    if(cache.length >= 2) {
        clearDisplay();
        let sum = cache[0] - cache[1];
        cache = [];
        cache.push(sum);
        setDisplayValue(cache);
    }
    else {
        clearDisplay();
    }


}

function multiply(a) { // mnozenie
    cache.push(a);
    console.log(cache);
    if(cache.length >= 2) {
        clearDisplay();
        let sum = cache[0] * cache[1];
        cache = [];
        cache.push(sum);
        setDisplayValue(cache);
    }
    else {
        clearDisplay();
    }



}

function split(a) {  // dzielenie
    cache.push(a);
    console.log(cache);
    if(cache.length >= 2) {
        clearDisplay();
        let sum = cache[0] / cache[1];
        cache = [];
        cache.push(sum);
        setDisplayValue(cache);
    }
    else {
        clearDisplay();
    }


}



function equal(a) {  // znak równości
    cache.push(a);
    console.log(cache);
    if(cache.length >= 2) {
        clearDisplay();



    }
    // Sprawdź, jaki operator został wybrany jako ostatni i czy została podana liczba, wtedy wykonaj działanie ostatniego operatora.
    // Jeśli nie podano liczby, a kliknięto operator, wyświetl wartość z pamięci podręcznej (cache).
}

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
