import { EVENTS, GAME_STATUSES, GRID_SIZE_BLOCK_VALUES, MOVING_DERECTIONS, POINST_TO_LOSE_BLOCK_VALUES, POINST_TO_WIN_BLOCK_VALUES, SOUND_STATUS, START_BUTTON_STATUS } from "./constans.js";

const _state = {
    gameStatus: GAME_STATUSES.SETTINGS,
    settings: {
        /**
         * in miliseconds 
         */
        googleJumpInterval: 2000,
        gridSizeBlockValues: GRID_SIZE_BLOCK_VALUES,
        pointsToWinBlockValues: POINST_TO_WIN_BLOCK_VALUES,
        pointsToLoseBlockValues: POINST_TO_LOSE_BLOCK_VALUES,
        // selectedGridSize: null,
        gridSize: {
            maxRowCount: 10,
            maxColumnCount: 10,
            rowsCount: 5,
            columnsCount: 5
        },
        pointsToLose: 10,
        pointsToWin: 5,
        sound: SOUND_STATUS.OFF,
    },
    startButton: {
        status: START_BUTTON_STATUS.disable
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
function _notifyObservers(name, payload = {}) {
    const event = {
        name,
        payload
    }

    _observers.forEach(item => {
        try {
            item(event);
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

    do {
        newPosition.x = _generateNewNumber(0, _state.settings.gridSize.columnsCount - 1);
        newPosition.y = _generateNewNumber(0, _state.settings.gridSize.rowsCount - 1);

    } while (_doesPositionMatchWithGooglePosition(newPosition) || _doesPositionMatchWithPlayer1Position(newPosition) || _doesPositionMatchWithPlayer2Position(newPosition))

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

function _doesPositionMatchWithPlayer1Position(newPosition) {
    return newPosition.x === _state.positions.players[0].x && newPosition.y === _state.positions.players[0].y;
}
function _doesPositionMatchWithPlayer2Position(newPosition) {
    return newPosition.x === _state.positions.players[1].x && newPosition.y === _state.positions.players[1].y;
}
function _doesPositionMatchWithGooglePosition(newPosition) {
    return newPosition.x === _state.positions.google.x && newPosition.y === _state.positions.google.y;
}

function _isPositionInValidRange(position) {
    if(position.x < 0 || position.x >= _state.settings.gridSize.columnsCount) return false;
    if(position.y < 0 || position.y >= _state.settings.gridSize.rowsCount) return false;

    return true;
}

function _catchGoogle(playerNumber) {
    const playerIndex = _getPlayerIndexByNumber(playerNumber);

    _state.points.players[playerIndex]++;
    _notifyObservers(EVENTS.SCORES_CHANGED);
    _notifyObservers(EVENTS.GOOGLE_COUGHT);

    if(_state.points.players[playerIndex] === _state.settings.pointsToWin) {
        _state.gameStatus = GAME_STATUSES.WIN;
        _notifyObservers(EVENTS.GAME_STATUS_CHANGED);
        clearInterval(googleJumpInterval);
    } else {
        const prevPosition = _state.positions.google;
        _jumpGoogleToNewPosition()
        _notifyObservers(EVENTS.GOOGLE_JUMPED , { 
            prevPosition,
            newPosition: _state.positions.google
        })
    }
}

//INTERFACE/ADAPTER

//COMMANDS/SETTERS
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
        //google jumped
        const prevPosition = {..._state.positions.google};
        _jumpGoogleToNewPosition();
        const newPosition = {..._state.positions.google}
        _notifyObservers(EVENTS.GOOGLE_JUMPED, {
            prevPosition,
            newPosition,
        })
        _notifyObservers(EVENTS.GOOGLE_RUN_AWAY);

        //points changed
        _state.points.google++;
        _notifyObservers(EVENTS.SCORES_CHANGED);
        //check if status changed
        if (_state.points.google === _state.settings.pointsToLose) {
            clearInterval(googleJumpInterval);
            _state.gameStatus = GAME_STATUSES.LOSE;
            _notifyObservers(EVENTS.GAME_STATUS_CHANGED);
        }
    }, _state.settings.googleJumpInterval);
    //status changed
    _state.gameStatus = GAME_STATUSES.IN_PROGRESS;
    _notifyObservers(EVENTS.GAME_STATUS_CHANGED);
}
export async function playAgain() {
    //status changed
    _state.gameStatus = GAME_STATUSES.SETTINGS;
    _notifyObservers(EVENTS.GAME_STATUS_CHANGED);
}
export async function movePlayer(playerNumber, direction) {
    if(_state.gameStatus !== GAME_STATUSES.IN_PROGRESS) {
        console.warn('You can move player only when game is on progress')};
    const playerIndex = _getPlayerIndexByNumber(playerNumber);
    const prevPosition = {..._state.positions.players[playerIndex]}
    const newPosition = {..._state.positions.players[playerIndex]}

    switch (direction) {
        case MOVING_DERECTIONS.UP:
            newPosition.y--;
            break;
        case MOVING_DERECTIONS.DOWN:
            newPosition.y++;
            break;
        case MOVING_DERECTIONS.LEFT:
            newPosition.x--;
            break;
        case MOVING_DERECTIONS.RIGHT:
            newPosition.x++;
            break;
    }

    const isValidRange = _isPositionInValidRange(newPosition)
    if(!isValidRange) return;

    const isPlayer1PositionTheSame = _doesPositionMatchWithPlayer1Position( newPosition)
    if(isPlayer1PositionTheSame) return;

    const isPlayer2PositionTheSame = _doesPositionMatchWithPlayer2Position( newPosition)
    if(isPlayer2PositionTheSame) return;

    const isGooglePositionTheSame = _doesPositionMatchWithGooglePosition( newPosition)
    if(isGooglePositionTheSame) {
        _catchGoogle(playerNumber);
    }

    _state.positions.players[playerIndex] = newPosition;
    _notifyObservers(EVENTS[`PLAYER${playerNumber}_MOVED`], {
        prevPosition: prevPosition,
        newPosition: newPosition,
    });

}

export async function saveSettings(newSettings) {
    
    const parsedNewSettings = JSON.parse(newSettings);
    // console.log(JSON.parse(newSettings));
    // if(_state.settings.sound === status) return;
    for (let index = 0; index < parsedNewSettings.length; index++) {
        if(parsedNewSettings[index].name == EVENTS.SAVE_GRID_SIZE_SETTINGS_VALUE) {
            _state.settings.gridSizeBlockValues.button.title = parsedNewSettings[index].payload
        }
        if(parsedNewSettings[index].name == EVENTS.SAVE_POINTS_TO_WIN_SETTINGS_VALUE) {
            _state.settings.pointsToWinBlockValues.button.title = parsedNewSettings[index].payload
        }
        if(parsedNewSettings[index].name == EVENTS.SAVE_POINTS_TO_LOSE_SETTINGS_VALUE) {
            _state.settings.pointsToLoseBlockValues.button.title = parsedNewSettings[index].payload
        }
        if(parsedNewSettings[index].name == EVENTS.SAVE_SOUND_STATUS) {
            _state.settings.sound = JSON.stringify(parsedNewSettings[index].payload)
        }
        
    }
    // _state.settings.sound = status;
    _notifyObservers(EVENTS.NEW_SETTINGS_VALUE_SAVED, {
        newSettings
    } );

}
//GETTERS/SELECTORS/QUERY
export async function getGooglePoints() {
    return _state.points.google
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
export async function getGridSizeBlockValues() {
    return _state.settings.gridSizeBlockValues
}
export async function getPointsToWinBlockValues() {
    return _state.settings.pointsToWinBlockValues
}
export async function getPointsToLoseBlockValues() {
    return _state.settings.pointsToLoseBlockValues
}
export async function getSoundStatus() { 
    return _state.settings.sound   
}
export async function getStartButtonStatus() { 
    return _state.startButton.status
    
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



