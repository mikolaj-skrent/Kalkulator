// Pobranie elementu planszy z DOM
const board = document.querySelector("#board");
// Zmienna przechowująca aktualnego gracza (X lub O)
let currentPlayer = "X";
// Tablica reprezentująca stan planszy (9 pól)
let gameBoard = ["", "", "", "", "", "", "", "", ""];

/**
 * Funkcja tworząca planszę gry - generuje 9 komórek (div) i dodaje je do planszy
 */
function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }
}

/**
 * Obsługa kliknięcia w komórkę planszy
 * @param {Event} event - Obiekt zdarzenia kliknięcia
 */
function handleCellClick(event) {
    // Pobranie elementu wyświetlającego komunikaty
    const messageTur = document.querySelector('#message');
    console.log('Cell clicked:', event.target.dataset.index);

    // Ustawienie symbolu aktualnego gracza w klikniętej komórce
    event.target.textContent = currentPlayer;
    // Aktualizacja stanu planszy w tablicy
    gameBoard[event.target.dataset.index] = currentPlayer;
    console.log(checkWin());

    // Sprawdzenie czy nastąpiła wygrana
    const winningCombo = checkWin();

    if (winningCombo) {
        // Obsługa wygranej
        messageTur.textContent = `${currentPlayer} wygrał!`;
        // Narysowanie linii przez zwycięskie pola
        drawWinningLine(winningCombo);
        console.log(`${currentPlayer} wygrał!`);
    } else {
        // Zmiana gracza, jeśli nie ma wygranej
        if (currentPlayer === "X") {
            currentPlayer = "O";
            messageTur.textContent = "Tura: O";
        } else {
            currentPlayer = "X";
            messageTur.textContent = "Tura: X";
        }
    }

    // Usunięcie możliwości ponownego kliknięcia w tę samą komórkę
    event.target.removeEventListener('click', handleCellClick);
}

/**
 * Sprawdzenie czy któryś z graczy wygrał
 * @returns {Array|false} - Zwraca tablicę z indeksami zwycięskiej kombinacji lub false
 */
function checkWin() {
    // Wszystkie możliwe kombinacje wygrywające (poziome, pionowe, ukośne)
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // Sprawdzenie każdej kombinacji wygrywającej
    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return condition;
        }
    }

    return false;
}

// Pobranie przycisku reset i dodanie obsługi zdarzenia kliknięcia
const resetBtn = document.querySelector("#resetBtn");
resetBtn.addEventListener("click", resetGame);

/**
 * Resetowanie gry do stanu początkowego
 */
function resetGame() {
    // Wyczyszczenie tablicy stanu gry
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    // Ustawienie X jako pierwszego gracza
    currentPlayer = "X";
    // Pobranie wszystkich komórek
    const cells = document.querySelectorAll(".cell");

    // Wyczyszczenie zawartości komórek i przywrócenie obsługi kliknięć
    cells.forEach((cell) => {
        cell.textContent = "";
        cell.addEventListener("click", handleCellClick);
    });

    // Usunięcie lini zwycięstwa, jeśli istnieje
    const lines = document.querySelectorAll(".line");
    lines.forEach(line => line.remove());

    // Aktualizacja komunikatu o turze
    document.getElementById("message").textContent = "Tura: X";
}

// utworzenie planszy i reset do startu
createBoard();
resetGame();

/**
 * Rysowanie linii przez zwycięskie pola
 * @param {Array} winningCombo
 */
function drawWinningLine(winningCombo) {
    // Utworzenie elementu linii
    const line = document.createElement("div");
    line.classList.add("line");
    board.appendChild(line);

    // Pobranie pierwszego i ostatniego indeksu z kombinacji wygrywającej
    const [start, , end] = winningCombo;

    // Ustawienie stylu linii w zależności od kombinacji wygrywającej
    if (start === 0 && end === 2) {
        // Pierwszy wiersz poziomy
        line.style.top = "50px";
        line.style.left = "0";
    } else if (start === 3 && end === 5) {
        // Drugi wiersz poziomy
        line.style.top = "155px";
        line.style.left = "0";
    } else if (start === 6 && end === 8) {
        // Trzeci wiersz poziomy
        line.style.top = "260px";
        line.style.left = "0";
    } else if (start === 0 && end === 6) {
        // Pierwsza kolumna pionowa
        line.style.width = "322px";
        line.style.top = "0";
        line.style.left = "55px";
        line.style.transform = "rotate(90deg)";
    } else if (start === 1 && end === 7) {
        // Druga kolumna pionowa
        line.style.width = "322px";
        line.style.top = "0";
        line.style.left = "160px";
        line.style.transform = "rotate(90deg)";
    } else if (start === 2 && end === 8) {
        // Trzecia kolumna pionowa
        line.style.width = "322px";
        line.style.top = "0";
        line.style.left = "265px";
        line.style.transform = "rotate(90deg)";
    } else if (start === 0 && end === 8) {
        // Przekątna z lewego górnego do prawego dolnego
        line.style.width = "444px";
        line.style.top = "0";
        line.style.left = "3px";
        line.style.transform = "rotate(45.7deg)";
    } else if (start === 2 && end === 6) {
        // Przekątna z prawego górnego do lewego dolnego
        line.style.width = "444px";
        line.style.top = "318px";
        line.style.left = "0";
        line.style.transform = "rotate(-45.7deg)";
    }
}