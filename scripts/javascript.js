

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

    //initiate players
    const computer = player.createPlayer("computer");
    const compPoints = document.querySelector(".compPoints");

    const human = player.createPlayer("human");
    const plPoints = document.querySelector(".plPoints");

    // computer makes their turn
    const compTurn = () =>{
        freeCells = cells.filter(function (e){
            return e.marker === "";
        });

        // check, if Player won already
        if(freeCells.length <= 4){
            checkWin("X");
            if(win === true){
                console.log("congrats, You won!")
                endRound(human);
                return;
            }
            if(freeCells.length === 0){return};
        }
        
        // tag random free cell
        tag = Math.floor(Math.random() * freeCells.length);

        freeCells[tag].marker = 'O';
        freeCells[tag].button.textContent = 'O';
        freeCells[tag].button.disabled = true;

        // check if computer won
        checkWin("O");
        if(win === true){
            console.log('oh no, you got outsmarted by a piece of metal :(');
            endRound(computer);
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

    const endRound = (winner) =>{
        // disable gameboard
        freeCells.forEach(x => {
            x.button.disabled = true;
        });

        // give Winner point
        winner.givePoints();
        if(winner.name === "computer"){
            compPoints.textContent = winner.getPoints();
        } else{
            plPoints.textContent = winner.getPoints();
        };

        if(human.getPoints() + computer.getPoints() < 3){

            setup.clear();
            setup.setBoard();
            
        };



    };
    
    
    return{computer, human, compTurn, info, checkWin}
})();

const setup = (function(){
    const dialog = document.querySelector("dialog");
    const startBtn = document.querySelector(".start");
    const plName = document.getElementById("name")
    const playerName = document.querySelector(".playerName")
    startBtn.addEventListener('click', ()=>{
        console.log(plName.value);
        if(plName.value == ""){
         return;
        }
        else { 
            playerName.textContent = plName.value + ":";
        };
    });


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

    const clear = () =>{
       while (board.firstChild){
        board.removeChild(board.firstChild);
       }
       cells = [];
    }
    
    return{setBoard, info, clear, board, cells, dialog, plName};
})();

setup.setBoard();
setup.dialog.showModal();

// const play = (function() {

//     // const {set, info} = game();
//     const board = game.setBoard();
//     const info = game.info();
//     // create computer player
    

//     return {computer, info, board, draw};
// })();
