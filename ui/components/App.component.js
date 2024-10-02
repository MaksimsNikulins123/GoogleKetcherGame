import {
    EVENTS,
    GAME_STATUSES
} from "../../core/constans.js";
import {
    getGameStatus,
    subscribe
} from "../../core/state-manger.proxy.js";
import {
    AudioComponent
} from "./Audio/Audio.component.js";
import {
    GridComponent
} from "./Grid/Grid.component.js";
import {
    LoseComponent
} from "./Lose/Lose.component.js";
import {
    ResultPanelComponent
} from "./ResultPanel/ResultPanel.component.js";
import {
    SettingsComponent
} from "./Settings/Settings.component.js";
import {
    StartComponent
} from "./Start/Start.component.js";
import { 
    WinComponent 
} from "./Win/Win.component.js";

export function AppComponent() {

    console.log('App component created')

    const localState = {
        prevGameStatus: null,
        cleanupFunctions: [],
    };

    
    const element = document.createElement('div');
    element.classList.add('app');
    // element.classList.add('adaptive');

    const audioComponent = AudioComponent()


    subscribe((e) => {
        console.log(e)
        if(e.name === EVENTS.GAME_STATUS_CHANGED) {
            render(element, localState);
        }
        
    })

    render(element, localState)

    return {
        element
    };
}

async function render(element, localState) {

    console.log('App component render');
    
    const gameStatusPromise = getGameStatus();
    const gameStatus = await gameStatusPromise;

    // console.log(gameStatus);

    if (localState.prevGameStatus === gameStatus) return;

    localState.prevGameStatus = gameStatus;

  
    // console.log(gameStatus);

    localState.cleanupFunctions.forEach(cleanupFunction => cleanupFunction());
    localState.cleanupFunctions = [];

    element.innerHTML = '';

    switch (gameStatus) {
        case GAME_STATUSES.SETTINGS: {
            const settingsComponent = SettingsComponent(gameStatus);
            localState.cleanupFunctions.push(settingsComponent.cleanup)
            const startComponent = StartComponent();
            // localState.cleanupFunctions.push(startComponent.cleanup)
            element.append(settingsComponent.element, startComponent.element);
            break;
        }
        case GAME_STATUSES.IN_PROGRESS:
            const settingsComponent = SettingsComponent(gameStatus);
            localState.cleanupFunctions.push(settingsComponent.cleanup)
            const resultPanelComponent = ResultPanelComponent();
            localState.cleanupFunctions.push(resultPanelComponent.cleanup)
            const gridComponent = GridComponent();
            localState.cleanupFunctions.push(gridComponent.cleanup)

            element.append(settingsComponent.element, resultPanelComponent.element, gridComponent.element)
            break;
        case GAME_STATUSES.LOSE:
            const loseComponent = LoseComponent();
            //    localState.cleanupFunctions.push(loseComponent.cleanup)
            element.append(loseComponent.element)
            break;
        case GAME_STATUSES.WIN:
            const winComponent = WinComponent();
            //    localState.cleanupFunctions.push(loseComponent.cleanup)
            element.append(winComponent.element)
            break;

        default:
            throw new Error('not implemented');
    }







}