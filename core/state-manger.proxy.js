

// Create a new EventSource object, pointing to the SSE endpoint
const eventSource = new EventSource('http://localhost:3000/events');
 
// Listen for messages from the server
eventSource.addEventListener('message', (eventSourseEvent) => {
    const event = JSON.parse(eventSourseEvent.data);

    _notifyObservers(event.name, event.payload);
})
//LocalState

// const localState = {
//     settingsValues: []
// }
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

//INTERFACE/ADAPTER

//COMMANDS/SETTERS
export async function start() {
    // saveSettings();
    fetch("http://localhost:3000/start");
}
export async function playAgain() {
    // saveSettings();
    fetch("http://localhost:3000/playAgain");
}
export async function movePlayer(playerNumber, direction) {
    fetch(`http://localhost:3000/movePlayer?playerNumber=${playerNumber}&direction=${direction}`);
}

//GETTERS/SELECTORS/QUERY
export async function getGooglePoints() {
    const response = await fetch("http://localhost:3000/getGooglePoints");
    const responsePayload = await response.json();
    return responsePayload.data;
}
/**
 * 
 * @param {number} playerNumber - one-based index of player
 * @returns {Promise<number>} number of points
 */
export async function getPlayerPoints(playerNumber) {
    const response = await fetch(`http://localhost:3000/getPlayerPoints?playerNumber=${playerNumber}`);
    const responsePayload = await response.json();
    return responsePayload.data;
}
export async function getGameStatus() {
    const response = await fetch("http://localhost:3000/getGameStatus");
    const responsePayload = await response.json();
    return responsePayload.data;
}
export async function getGridSizeBlockValues() {
    const response = await fetch("http://localhost:3000/getGridSizeBlockValues");
    const responsePayload = await response.json();
    return responsePayload.data;
}
export async function getPointsToWinBlockValues() {
    const response = await fetch("http://localhost:3000/getPointsToWinBlockValues");
    const responsePayload = await response.json();
    return responsePayload.data;
}
export async function getPointsToLoseBlockValues() {
    const response = await fetch("http://localhost:3000/getPointsToLoseBlockValues");
    const responsePayload = await response.json();
    return responsePayload.data;
}
export async function getSoundStatus() {
    const response = await fetch("http://localhost:3000/getSoundStatus");
    const responsePayload = await response.json();
    return responsePayload.data;
}
export async function getStartButtonStatus() {
    const response = await fetch("http://localhost:3000/getStartButtonStatus");
    const responsePayload = await response.json();
    return responsePayload.data;
}



export async function getGridSize() {
    const response = await fetch("http://localhost:3000/getGridSize");
    const responsePayload = await response.json();
    return responsePayload.data;
}
export async function getGooglePosition() {
    const response = await fetch("http://localhost:3000/getGooglePosition");
    const responsePayload = await response.json();
    return responsePayload.data;
}
export async function getPlayerPosition(playerNumber) {
    const response = await fetch(`http://localhost:3000/getPlayerPosition?playerNumber=${playerNumber}`);
    const responsePayload = await response.json();
    return responsePayload.data;
}


//local changes

export function setValue(name, payload) {
    if(localStorage.length === 5) {
    const startButton = document.getElementById('start-btn')
    if(startButton !== null) {
        startButton.disabled = false
     localStorage.setItem('startButtonDisableStatus', 'false')
    }
}
_notifyObservers(name, payload);
}

export async function saveSettings() {
    
    if(localStorage.length === 5) {
        const stringifiedSettingsValues = JSON.stringify(localStorage)
        await fetch(`http://localhost:3000/saveSettings?newSettings=${stringifiedSettingsValues}`)
    } else return;
}


