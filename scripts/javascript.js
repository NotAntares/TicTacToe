

// const game = (function() {
//     // set and reset Gameboard
//     const set = () => {
//         let row1 = [0,0,0];
//         let row2 = [0,0,0];
//         let row3 = [0,0,0];
//         board = [row1, row2, row3];};
   
//         //view Gameboard in console   
//     const info =() => console.table(board);


//     // create User who can collect points
//     const createPlayer = (name) => {
//         let points = 0;
//         const getPoints = () => points;
//         const givePoints = () => points++;
//         return{name, getPoints, givePoints};
//     };
//     // set up Computer-Player
//     const computer = createPlayer("computer");


//     // let players make marks
//     const draw = (player, row, pos) =>{
        
//         if(player === computer.name){
//             tag = 'O'
//             computer.givePoints();
//             console.log('Score is now' + computer.getPoints())
//         }
//         else{ 
//             tag = 'X';
//         }

//         board[row].splice(pos,1,tag)
//     };


//     return{set, info, computer, draw};
// })();


const player = (function() {
    // create User who can collect points
    const createPlayer = (name) => {
        let points = 0;
        const getPoints = () => points;
        const givePoints = () => points++;
        let marker = 'X';
        if(name === "computer"){
            marker = 'O';}
        return{name, marker, getPoints, givePoints};
    };



    return { createPlayer}
})();


// verhindern, dass spieler letzen button clicken kann, nachdem PC gewonnen hat (oder er selbst);
// punkte und rundensystem
// player aufsetzen


const game = (function() {
    const winCons = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    //initiate computer player
    const computer = player.createPlayer("computer");

    // computer makes their turn
    const compTurn = () =>{
        freeCells = cells.filter(function (e){
            return e.marker === "";
        });

        if(freeCells.length <= 4){
            checkWin("X");
            if(win === true){
                console.log("congrats, You won!")
                return;
            }
            if(freeCells.length === 0){return};
        }
        

        tag = Math.floor(Math.random() * freeCells.length);

        freeCells[tag].marker = 'O';
        freeCells[tag].button.textContent = 'O';
        freeCells[tag].button.disabled = true;
        checkWin("O");
        if(win === true){
            console.log('oh No, you got outsmarted by a piece of metal :(');
        }
        

    };

    const info = () => console.table(taggedCells);

    const checkWin = (tag) =>{
        // filter ids of filled cells with specific tag
        taggedCells = cells.filter(function (e){
            return e.marker === tag;
        }).map((x)=>{return x.id});
        
        // check if filled Cells meet win conditions
        winnerRow = winCons.map((x)=>{
            let row = '';
            x.forEach(num => {
                if(taggedCells.includes(num) ==! true) {return row = row+'0'}
                else{return row = row+'1'};
            });
            return row;
        });

        console.log(winnerRow);
        (winnerRow.includes('111')) ? win = true : win = false;
        
        return win;
    };
    
    
    return{ computer, compTurn, info, checkWin,}
})();

const setup = (function(){

     const board = document.querySelector(".board");
     cells = [];

    const setBoard = () =>{

            

            for(let i = 0; i < 9; i++) {
                button = document.createElement("button");

                button.addEventListener("click", function(tag){
                    console.log(i);
                    this.textContent = "X";
                    cells[i].marker = "X";
                    this.disabled = true;
                    game.compTurn();

                });
                board.appendChild(button);
                cells.push({button: button, id: i, marker: ''});
            };
            
         };
   
        //view Gameboard in console   
    const info = () => console.table(cells);
    
    return{setBoard, info, board, cells};
})();

setup.setBoard();

// const play = (function() {

//     // const {set, info} = game();
//     const board = game.setBoard();
//     const info = game.info();
//     // create computer player
    

//     return {computer, info, board, draw};
// })();
