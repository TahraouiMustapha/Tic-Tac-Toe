const Gameboard = (function() {
    let gameboard = [
        '','','',
        '','','',
        '','',''       
    ];

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

    return { gameboard, addSymbol, checkOver, checkWinner };
})();

function createPlayer (name, symbol) {
    return {name, symbol};
}

const player1 = createPlayer('yassin', 'X');
const player2 = createPlayer('moh', 'O');

const gameController = (function () {
    let currentPlayer = player1;

    const startGame = () => {
        displayController.renderContent();
        let fullSpots = 0;
        let isThereWinner = false;

        while (fullSpots < 9) {
            // displayController.gameState(currentPlayer.symbol);
            let choice = prompt('enter your choice:');
            let addHisChoice = Gameboard.addSymbol(currentPlayer.symbol, choice);
            console.log(Gameboard.gameboard);
            if (Gameboard.checkWinner(currentPlayer.symbol)) {
                finishGame(currentPlayer);
                isThereWinner = true;
                break;
            }
            if (addHisChoice) {
                fullSpots++;
                currentPlayer = currentPlayer === player1 ? player2 : player1;
            }
        }
        //when game is over
        if (Gameboard.checkOver() && !isThereWinner){
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
        const gameboard = Gameboard.gameboard;
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
        myDiv.classList.add('currentPlayer');
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