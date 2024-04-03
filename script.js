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
    };

    const finishGame = (player) => {
        console.log('good job');
        console.log(player.name + ' you are win with ' + player.symbol);
    };
    
    const getIndexOfSpot = (index) => {
        if (!Gameboard.checkOver()) {
            let choice = index;
            let addHisChoice = Gameboard.addSymbol(currentPlayer.symbol, choice);
            displayController.updateContent();
            if (Gameboard.checkWinner(currentPlayer.symbol)) {
                finishGame(currentPlayer);
            }
            if (addHisChoice) {
                currentPlayer = currentPlayer === player1 ? player2 : player1;
            }

            if (Gameboard.checkOver()) {
                console.log('game is over');
            }
        } 
    };

    return { startGame, finishGame, getIndexOfSpot };
})();

const displayController = (function () {
    const board = document.querySelector('.board');

    const renderContent = () => {
        const gameboard = Gameboard.gameboard;
        for(let i = 0; i < 9; i++) {
            let repos = document.createElement('div');
            repos.classList.add('item');
            repos.setAttribute('data-index', i);
            repos.addEventListener('click', (e) => {
                gameController.getIndexOfSpot(e.target.dataset.index);
            });
            repos.textContent = gameboard[i];
            board.appendChild(repos);
        }
    };

    const updateContent = () => {
        const gameboard = Gameboard.gameboard;
        const items = Array.from(document.querySelectorAll('.item'));
        for (let i = 0; i < 9; i++) {
            items[i].innerHTML = gameboard[i];
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



    
    return { renderContent, gameState, updateContent }; 
})();


gameController.startGame();