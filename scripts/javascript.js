

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
        return{name, getPoints, givePoints};
    };

    return { createPlayer}
})();


// entweder buttons für spielfeld generieren und im loop direkt mit event trigger und position im array versehen oder
// for each child of DOM - "board": child.addevent, array.push(child)


const game = (function() {
    // set and reset Gameboard
    const setBoard = (round) => {
        round = [1,2,3,4,5,6,7,8,9];
        round.fill(null);
        // let row1 = [0,0,0];
        // let row2 = [0,0,0];
        // let row3 = [0,0,0];
        // board = [row1, row2, row3];
    };
   
        //view Gameboard in console   
    const info = (round) => console.table(round);

    //initiate computer player
    const computer = player.createPlayer("computer");


    const draw = (player, row, pos) =>{

        if(player === computer.name){
            tag = 'O'
            computer.givePoints();
            console.log('Score is now' + computer.getPoints())
        }
        else{ 
            tag = 'X';
        }

        board[row].splice(pos,1,tag)
    };
    

    
    return{setBoard, info, draw, computer}
})();

// const play = (function() {

//     // const {set, info} = game();
//     const board = game.setBoard();
//     const info = game.info();
//     // create computer player
    

//     return {computer, info, board, draw};
// })();
