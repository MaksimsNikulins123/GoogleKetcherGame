import { GAME_STATUSES } from "./constans.js";

const _state = {
    gameStatus: GAME_STATUSES.SETTINGS,
    settings: {
        /**
         * in miliseconds 
         */
        googleJumpInterval: 2000,
        gridSize: {
            rowsCount: 5,
            columnsCount: 5
        },
        pointsToLose: 2,
        pointsToWin: 5,
    },
    positions: {
        google: {
            x: 2,
            y: 2
        },
        players: [{
                x: 0,
                y: 0
            },
            {
                x: 2,
                y: 2
            }
        ],
    },
    points: {
        google: 0,
        players: [0, 0]
    }
}

//OBSERVER
let _observers = [];

export function subscribe(observer) {
    _observers.push(observer);
}

export function unsubscribe(observer) {
    _observers = _observers.filter(item => item !== observer)
}

function _notifyObservers() {
    _observers.forEach(item => {
        try {
            item();
        } catch (error) {
            console.error(error)
        }
    })
}


// This function returns a random integer between the specified values. The value is no lower than min (or the next integer greater than min if min isn't an integer) and is less than (but not equal to) max

// Math.ceil(): Rounds the result up to the nearest integer, which can be slightly tricky when generating random integers within a range.
// Math.floor() rounds it down to the nearest whole number
// Math.random() generates a number between 0 (inclusive) and 1 (exclusive)
// Multiplying by (max - min + 1) and adding min scales it to the desired range

function _generateNewNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//GOOGLE ACTIONS
function _jumpGoogleToNewPosition() {
    const newPosition = {
        ..._state.positions.google
    }

    let isNewPositionMatchToCurrentGooglePosition = {};
    let isNewPositionMatchToCurrentPlayer1Position = {};
    let isNewPositionMatchToCurrentPlayer2Position = {};

    do {
        newPosition.x = _generateNewNumber(0, _state.settings.gridSize.columnsCount - 1);
        newPosition.y = _generateNewNumber(0, _state.settings.gridSize.rowsCount - 1);

        isNewPositionMatchToCurrentGooglePosition = newPosition.x === _state.positions.google.x && newPosition.y === _state.positions.google.y;
        isNewPositionMatchToCurrentPlayer1Position = newPosition.x === _state.positions.players[0].x && newPosition.y === _state.positions.players[0].y;
        isNewPositionMatchToCurrentPlayer2Position = newPosition.x === _state.positions.players[1].x && newPosition.y === _state.positions.players[1].y;

    } while (isNewPositionMatchToCurrentGooglePosition || isNewPositionMatchToCurrentPlayer1Position || isNewPositionMatchToCurrentPlayer2Position)

    _state.positions.google = newPosition;

}

//VAVIDATOR FOR PLAYER INDEX
function _getPlayerIndexByNumber(playerNumber) {
    const playerIndex = playerNumber - 1;
    if (playerIndex < 0 || playerIndex > _state.points.players.length - 1) {
        throw new Error('Incorrect player number')
    }
    return playerIndex;
}

let googleJumpInterval;




//INTERFACE/ADAPTER
export async function getGooglePoints() {
    return _state.points.google
}

export async function start() {

    if(_state.gameStatus !== GAME_STATUSES.SETTINGS) {
        throw new Error(`Incorect transition from ${_state.gameStatus} to ${_state.gameStatus}`)
    }
    
    _state.positions.players[0] = {x:0, y:0};
    _state.positions.players[1] = {x:_state.settings.gridSize.columnsCount - 1, y:_state.settings.gridSize.rowsCount - 1};
    _jumpGoogleToNewPosition();

    _state.points.google = 0;
    _state.points.players = [0, 0];

    googleJumpInterval = setInterval(() => {
        _jumpGoogleToNewPosition();
        _state.points.google++;
    
        if (_state.points.google === _state.settings.pointsToLose) {
            clearInterval(googleJumpInterval);
            _state.gameStatus = GAME_STATUSES.LOSE;
        }
        _notifyObservers();
    }, _state.settings.googleJumpInterval);

    _state.gameStatus = GAME_STATUSES.IN_PROGRESS;
    _notifyObservers();
}

export async function playAgain() {
    _state.gameStatus = GAME_STATUSES.SETTINGS;
    _notifyObservers();
}

/**
 * 
 * @param {number} playerNumber - one-based index of player
 * @returns {Promise<number>} number of points
 */
export async function getPlayerPoints(playerNumber) {
    const playerIndex = _getPlayerIndexByNumber(playerNumber)
    return _state.points.players[playerIndex]
}
export async function getGameStatus() {
    return _state.gameStatus
}


export async function getGridSize() {
    return {
        ..._state.settings.gridSize
    }
}

export async function getGooglePosition() {
    return {
        ..._state.positions.google
    }
}

export async function getPlayerPosition(playerNumber) {
    const playerIndex = _getPlayerIndexByNumber(playerNumber)
    return {
        ..._state.positions.players[playerIndex]
    }
}