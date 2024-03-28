const Gameboard = (function() {
    let gameboard = [
        '','','',
        '','','',
        '','',''       
    ];
   
    const getBoard = () => {
        return gameboard;
    };

    const addSymbol = (symbol, index) => {
        if (gameboard[index] === '') {
            gameboard[index] = symbol;
            return true;
        } else {
            return false;
        }
    };

    const checkOver = () => {
        return gameboard.every((element) => element != '');
    };    

    const checkWinner = (symbol) => {
        let winnerLine = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],//for horizontal lines 
            [0, 3, 6], [1, 4, 7], [2, 5, 8],//for vertical lines 
            [0, 4, 8], [2, 4, 6]//for diagonal lines 
        ];

        for (let line of winnerLine) {
            if ( gameboard[line[0]] == symbol &&
                 gameboard[line[1]] == symbol &&
                 gameboard[line[2]] == symbol
                 ) {
                    return true;
                 }
        }

        return false;
    };

    return { getBoard, addSymbol, checkOver, checkWinner };
})();

function createPlayer (name, symbol) {
    return {name, symbol};
}

const player1 = createPlayer('yassin', 'X');
const player2 = createPlayer('moh', 'O');

const gameController = (function () {
    let playerTurn = player1;
    let fullSpots = 0;
    const startGame = () => {
        displayController.renderContent();
        while (fullSpots < 9) {
            // displayController.gameState(playerTurn.symbol);
            // let choice = prompt('enter your choice:');
            let addHisChoice = Gameboard.addSymbol(playerTurn.symbol, choice);
            if (Gameboard.checkWinner(playerTurn.symbol)) {
                finishGame(playerTurn);
                break;
            }
            if (addHisChoice) {
                fullSpots++;
                playerTurn = playerTurn === player1 ? player2 : player1;
            }
        }
        //when game is over
        if (Gameboard.checkOver() && !Gameboard.checkWinner(playerTurn.symbol)){
            // displayController.gameState('over');
            console.log("game is over");
        }
    };

    const finishGame = (player) => {
        console.log('good job');
        console.log(player.name + ' you are win with ' + player.symbol);
    };

    return { startGame, finishGame };
})();

const displayController = (function () {
    const board = document.querySelector('.board');

    const renderContent = () => {
        const gameboard = Gameboard.getBoard();
        for(let i = 0; i < 9; i++) {
            let repos = document.createElement('div');
            repos.classList.add('item');
            repos.textContent = gameboard[i];
            board.appendChild(repos);
        }
    };

    let body = document.body;
    const gameState= (turn) => {
        let myDiv = document.createElement('div');
        myDiv.classList.add('playerTurn');
        if (turn === 'over') {
            myDiv.textContent = 'game is over';
        } else {
            myDiv.textContent = '\' '+ turn + ' \' turn:';
        }
        body.insertBefore(myDiv, board);
    };


    
    return { renderContent, gameState }; 
})();


gameController.startGame();