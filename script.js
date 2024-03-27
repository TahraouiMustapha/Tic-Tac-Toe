const Gameboard = (function() {
    let gameboard = [
        'X','O','X',
        'O','X','O',
        'X','X','O'       
    ];
   
    const getBoard = () => {
        return gameboard;
    };

    const addSymbol = (symbol, index) => {
        if (gameboard[index] === '') {
            gameboard[index] = symbol;
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
    let turn = 'X';
    const startGame = () => {
        displayController.renderContent();
        while(!Gameboard.checkOver()) {
            displayController.gameState(turn);
            // let choice = prompt('enter your choice:');
            if (turn === 'X') {        
                Gameboard.addSymbol(turn, choice);
                console.log(Gameboard.getBoard());
                if (Gameboard.checkWinner(turn)) {
                    finishGame(turn);
                    break;
                }
                turn = 'O';
            } else {
                Gameboard.addSymbol(turn, choice);
                console.log(Gameboard.getBoard());
                if (Gameboard.checkWinner(turn)) {
                    finishGame(turn);
                    break;
                }
                turn = 'X';
            }
        }
        //when game is over
        displayController.gameState('over');
    };

    const finishGame = (symbolWon) => {
        console.log('good job');
        let name;
        if (symbolWon === player1.symbol) {
            name = player1.name;
        } else {
            name = player2.name;
        }
        console.log(name + ' you are win with ' + symbolWon);
    };

    return { startGame, finishGame };
})();

const displayController = (function () {
    const board = document.querySelector('.board');

    const renderContent = () => {
        for(let i = 0; i < 9; i++) {
            let repos = document.createElement('div');
            repos.classList.add('item');
            repos.textContent = Gameboard.getBoard()[i];
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