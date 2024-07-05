import {
    GAME_STATUSES
} from "../../core/constans.js";
import {
    getGameStatus,
    subscribe
} from "../../core/state-manger.js";
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

export function AppComponent() {

    const localState = {
        prevGameStatus: null,
        cleanupFunctions: [],
    };

    console.log('App component created')
    const element = document.createElement('div');

    subscribe(() => {
        render(element, localState);
    })

    render(element, localState)

    return {
        element
    };
}

async function render(element, localState) {

    const gameStatus = await getGameStatus();

    if (localState.prevGameStatus === gameStatus) return;

    localState.prevGameStatus = gameStatus;

    console.log('App component render');

    localState.cleanupFunctions.forEach(cleanupFunction => cleanupFunction());
    localState.cleanupFunctions = [];

    element.innerHTML = '';

    switch (gameStatus) {
        case GAME_STATUSES.SETTINGS: {
            const settingsComponent = SettingsComponent();
             // localState.cleanupFunctions.push(settingsComponent.cleanup)
            const startComponent = StartComponent();
            // localState.cleanupFunctions.push(startComponent.cleanup)
            element.append(settingsComponent.element, startComponent.element);
            break;
        }
        case GAME_STATUSES.IN_PROGRESS:
            const settingsComponent = SettingsComponent();
            // localState.cleanupFunctions.push(settingsComponent.cleanup)
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

        default:
            throw new Error('not implemented');
    }







}