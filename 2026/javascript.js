
const gameboard = (() => {

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

    return{getBoard, makeMove};

})();

console.log(gameboard.getBoard());


function createPlayer(name, mark) {
    let score= 0;

    const getScore = () => score;
    const win = () => score++;
    const makeMove = (x, y) => {
        gameboard.makeMove(x, y, mark);
    };

    return {name, getScore, win, mark, makeMove};
};

const gameController = (() => {
    const player1 = createPlayer("Schmojo", "X");
    const player2 = createPlayer("JoSchmo", "O");

    return {
        player1, player2
    };

})();

gameController.player1.makeMove(0, 0);
console.log(gameboard.getBoard());
