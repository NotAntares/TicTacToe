

const game = (function() {
    // set and reset Gameboard
    const set = () => {
        let row1 = [0,0,0];
        let row2 = [0,0,0];
        let row3 = [0,0,0];
        board = [row1, row2, row3];};
   
        //view Gameboard in console   
    const info =() => console.table(board);


    // create User who can collect points
    const createPlayer = (name) => {
        let points = 0;
        const getPoints = () => points;
        const givePoints = () => points++;
        return{name, getPoints, givePoints};
    };
    // set up Computer-Player
    const computer = createPlayer("computer");


    // let players make marks
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


    return{set, info, computer, draw};
})();
