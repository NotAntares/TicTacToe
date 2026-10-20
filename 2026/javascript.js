

const gameboard = (() => {
    const boardelement = document.getElementById("gameboard");

    const rows= 3;
    const columns= 3;
    const board = [];

    const cell = function () {
        let value= "";
        const getValue = () => value;
        const setValue = (newValue) => {
            value= newValue;
        };
        return {getValue, setValue};
    };

    for (let i= 0; i< rows; i++) {
        board[i] = [];
        for (let j= 0; j< columns; j++) {
            board[i].push(cell());
            const cellButton = document.createElement("button");
            boardelement.appendChild(cellButton);
            cellButton.addEventListener("click", () => {
                if (board[i][j].getValue() === "") {
                    board[i][j].setValue(gameController.getActivePlayer().mark);
                    console.log(`Player ${gameController.getActivePlayer().name} placed ${gameController.getActivePlayer().mark} at (${i}, ${j})`);
                    cellButton.textContent = gameController.getActivePlayer().mark;
                    gameController.takeTurn();
                }
            });
        }
    };

    const getBoard= () =>{
        return board.map(row =>
            row.map(cell => cell.getValue())
        );
    };

    const makeMove= (x, y, mark) => {
        if (board[x][y].getValue() === "") {
            board[x][y].setValue(mark);
            console.log(board[x][y].getValue());
        } else {
            console.log("Invalid move. Cell already occupied.");
        }
    };

    const winCons = [
        // Zeilen
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],

        // Spalten
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],

        // Diagonalen
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
        ];

    const checkwin = () => {
        for (const combination of winCons) {
            const [a, b, c] = combination;
            console.log(a, b, c);

            const aValue = board[a[0]][a[1]].getValue();
            const bValue = board[b[0]][b[1]].getValue();
            const cValue = board[c[0]][c[1]].getValue();

            if (aValue === bValue && aValue === cValue && aValue !== "") {
                console.log(`Player ${aValue} wins!`);
                return true;
                 // Return the winning marker
            }
            else{
                console.log("no winner yet");
            }
        };
    };

    const resetBoard = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                board[i][j].setValue("");
                const cellButton = boardelement.children[i * columns + j];
                cellButton.textContent = "";
            }
        }
    };

    return{getBoard, makeMove, checkwin, resetBoard};

})();

const gameController = (() => {
    const player1 = createPlayer("Schmojo", "X");
    const player2 = createPlayer("JoSchmo", "O");
    console.log(player1, player2);
    let activePlayer = player1;
    let moveCount = 0;

    const takeTurn = () => {
        if (moveCount >= 3) {
            if(gameboard.checkwin()==true){
                document.querySelector(".win").textContent = `Player ${activePlayer.name} wins!`;
                activePlayer.win();
            }
        };
        activePlayer = (activePlayer === player1) ? player2 : player1;
        moveCount++;

        return activePlayer;
    };

    const getActivePlayer = () => activePlayer;

    const nextRound = () => {
        gameboard.resetBoard();
        moveCount = 0;
        activePlayer = player1;
    };

    const nextButton = document.getElementById("new-round");
    nextButton.addEventListener("click", nextRound);

    const resetGame = () => {
        gameboard.resetBoard();
        moveCount = 0;
        activePlayer = player1;
        player1.resetScore();
        player2.resetScore();
    };

    const resetButton = document.getElementById("reset-button");
    resetButton.addEventListener("click", resetGame);

    return {
            player1, player2, takeTurn, activePlayer, getActivePlayer
        };
})();

function createPlayer(name, mark) {
    let score= 0;
    const scoreElement = document.createElement("h2");
    document.querySelector(".score").appendChild(scoreElement);
    scoreElement.textContent = ` ${score}`;

    const resetScore = () => {
        score = 0;
        scoreElement.textContent = `${score}`
    };
    const getScore = () => score;
    const win = () => {
        score++;
        scoreElement.textContent = `${score}`;
    };
    return {name, getScore, win, mark, resetScore};
};
