const gameController = (() => {
    const player1 = createPlayer("Schmojo", "X");
    const player2 = createPlayer("JoSchmo", "O");
    console.log(player1, player2);
    let activePlayer = player1;
    let win = false;
    
    // aktuell scheine ich aktivePlayer nicht zu ändern, wenn ich takeTurn() aufrufe. Ich muss das noch debuggen.
    const takeTurn = () => {
        activePlayer = (activePlayer === player1) ? player2 : player1;
        return activePlayer;
    };

    // while (win === false) {
    //     activePlayer.makeMove()
    // };

    return {
            player1, player2, takeTurn, activePlayer
        };
})();

function createPlayer(name, mark) {
    let score= 0;
    let moveCount = 0;

    const getScore = () => score;
    const win = () => score++;
    // const makeMove = (x, y) => {
    //     gameboard.makeMove(x, y, mark);
    //     moveCount++;
    //     takeTurn();
    //     if (moveCount >= 3) {
    //         checkWin(mark);
    //     };
    // };
    return {name, getScore, win, mark};
};

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
                    board[i][j].setValue(gameController.activePlayer.mark);
                    console.log(`Player ${gameController.activePlayer.name} placed ${gameController.activePlayer.mark} at (${i}, ${j})`);
                    cellButton.textContent = gameController.activePlayer.mark;
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
                return aValue;
                 // Return the winning marker
            }
            else{
                console.log("no winner yet");
            }
        };
    };

    return{getBoard, makeMove, checkwin};

})();

console.log(gameboard.getBoard());

// gameController.player1.makeMove(0, 0);
// gameController.player1.makeMove(0, 1);
// gameController.player1.makeMove(0, 2);
console.log(gameboard.getBoard());
console.log(gameboard.checkwin());
