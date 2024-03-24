const Gameboard = (function() {
    let gameboard = [];
    let index = 1;
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++){
            gameboard.push(cell(index++));
        }
    }

    return { gameboard };
})();

function createPlayer (name, assingnedXO) {
    return {name, assingnedXO};
}

const player1 = createPlayer('yassin', 'X');
const player2 = createPlayer('moh', 'O');

const gameController = (function () {
    return {};
})();

const displayController = (function () {
    return {}; 
})();

//object Cell for each gameboard
function cell (index) {
    return { index };
} 
