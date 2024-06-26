const Gameboard = (function() {
    let gameboard = [
        '','','',
        '','','',
        '','',''       
    ];

    const addSymbol = (symbol, index) => {
        if (Gameboard.gameboard[index] === '') {
            Gameboard.gameboard[index] = symbol;
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
            if ( Gameboard.gameboard[line[0]] == symbol &&
                 Gameboard.gameboard[line[1]] == symbol &&
                 Gameboard.gameboard[line[2]] == symbol
                 ) {
                    return true;
                 }
        }

        return false;
    };

    const resetTheBoard = () => {
        Gameboard.gameboard = [
            '','','',
            '','','',
            '','',''       
        ];
    };

    return { gameboard, addSymbol, checkOver, checkWinner, resetTheBoard };
})();

function createPlayer (name, symbol) {
    return {name, symbol};
}

let player1 ;
let player2 ;

const gameController = (function () {
    let currentPlayer ;
    let firstGame = true;

    const startGame = () => {
        if (firstGame) {
            displayController.renderContent();
            firstGame = false;
        } else {
            displayController.changeDisplay();
        }
        currentPlayer = player1;
    };

    const result = document.querySelector('.result');
    const finishGame = (player) => {
        result.textContent = player.name + ' you are win with ' + player.symbol ;
        Gameboard.resetTheBoard();
    };
    
    const getIndexOfSpot = (index) => {
        result.textContent = '';
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
                resutl.textContent = 'game is over';
            }
        } 
    };

    return { startGame, finishGame, getIndexOfSpot };
})();

const displayController = (function () {
    let body = document.body;
    const board = document.querySelector('.board');
    const myForm = document.querySelector('.myForm');
    const restart = document.createElement('button');
    const result = document.querySelector('.result');


    const renderContent = () => {
        board.style.display = 'grid';

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

        restart.textContent = 'restart';
        restart.setAttribute('id','restartBtn');
        body.appendChild(restart);
        restart.addEventListener('click', () => {
            restart.style.display = 'none';
            Gameboard.resetTheBoard();
            displayController.updateContent();
            board.style.display = 'none';
            myForm.style.display = 'block';
            result.textContent = '';
        }) ;

    };

    const updateContent = () => {
        const gameboard = Gameboard.gameboard;
        const items = Array.from(document.querySelectorAll('.item'));
        for (let i = 0; i < 9; i++) {
            items[i].innerHTML = gameboard[i];
        }
    };

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

    const start = document.querySelector('#startBtn');
    const getPlayerNames = () => {
        const namePlayer1 = document.querySelector('.player1Name');
        const namePlayer2 = document.querySelector('.player2Name');
        start.onclick =  () => {
            if (namePlayer1.value != '' && namePlayer2.value != '') {
                player1 = createPlayer(namePlayer1.value, 'X');
                player2 = createPlayer(namePlayer2.value, 'O');
                myForm.style.display = 'none';
                gameController.startGame();
            }

        };
    };

    const changeDisplay = () => {
        myForm.style.display = 'none';
        board.style.display = 'grid';
        restart.style.display = 'block';
    };

    
    return { renderContent, gameState, updateContent, getPlayerNames, changeDisplay }; 
})();



displayController.getPlayerNames();