const boardElement =
    document.getElementById("sudoku-board");

const solveButton =
    document.getElementById("solveBtn");

const clearButton =
    document.getElementById("clearBtn");

const resetButton =
    document.getElementById("resetBtn");

const messageElement =
    document.getElementById("message");


// Initial Sudoku

const initialBoard = [

    ["5", "3", ".", ".", "7", ".", ".", ".", "."],

    ["6", ".", ".", "1", "9", "5", ".", ".", "."],

    [".", "9", "8", ".", ".", ".", ".", "6", "."],

    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],

    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],

    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],

    [".", "6", ".", ".", ".", ".", "2", "8", "."],

    [".", ".", ".", "4", "1", "9", ".", ".", "5"],

    [".", ".", ".", ".", "8", ".", ".", "7", "9"]

];


// Create Sudoku Board

function createBoard(board) {

    boardElement.innerHTML = "";

    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            const input =
                document.createElement("input");

            input.classList.add("cell");

            input.type = "text";

            input.maxLength = 1;

            input.value =
                board[row][col] === "."
                ? ""
                : board[row][col];

            // Allow only numbers 1-9

            input.addEventListener(
                "input",
                function () {

                    this.value =
                        this.value.replace(
                            /[^1-9]/g,
                            ""
                        );

                }
            );

            boardElement.appendChild(input);
        }
    }
}


// Get board from frontend

function getBoard() {

    const cells =
        document.querySelectorAll(".cell");

    const board = [];

    for (let row = 0; row < 9; row++) {

        const currentRow = [];

        for (let col = 0; col < 9; col++) {

            const value =
                cells[row * 9 + col].value;

            currentRow.push(
                value === "" ? "." : value
            );

        }

        board.push(currentRow);
    }

    return board;
}


// Display board

function displayBoard(board) {

    const cells =
        document.querySelectorAll(".cell");

    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            cells[row * 9 + col].value =
                board[row][col] === "."
                ? ""
                : board[row][col];

        }
    }
}


// Solve Sudoku

solveButton.addEventListener(
    "click",
    async function () {

        messageElement.textContent =
            "Solving Sudoku...";

        const board = getBoard();

        try {

            const response =
                await fetch("/solve", {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        board: board
                    })

                });


            const data =
                await response.json();


            if (data.success) {

                displayBoard(data.board);

                messageElement.textContent =
                    "✅ Sudoku Solved Successfully!";

            } else {

                messageElement.textContent =
                    "❌ " + data.message;

            }

        } catch (error) {

            console.error(error);

            messageElement.textContent =
                "❌ Something went wrong.";

        }

    }
);


// Clear Board

clearButton.addEventListener(
    "click",
    function () {

        const emptyBoard =
            Array.from(
                { length: 9 },
                () => Array(9).fill(".")
            );

        displayBoard(emptyBoard);

        messageElement.textContent = "";

    }
);


// Reset Board

resetButton.addEventListener(
    "click",
    function () {

        createBoard(initialBoard);

        messageElement.textContent =
            "";

    }
);


// Load initial Sudoku

createBoard(initialBoard);