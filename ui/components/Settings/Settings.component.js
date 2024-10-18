import {
    getGridSizeBlockValues,
    getPointsToLoseBlockValues,
    getPointsToWinBlockValues,
    getSoundStatus,
} from "../../../core/state-manger.proxy.js";
import { BurgerComponent } from "../common/Burger/Burger.component.js";
import {
    GridSizeComponent
} from "./GridSize/GridSize.component.js";
import {
    PointsToLoseComponent
} from "./PointsToLose/PointsTolose.component.js";
import {
    PointsToWinComponent
} from "./PointsToWin/PointsToWin.component.js";
import {
    SoundComponent
} from "./Sound/Sound.component.js";


export function SettingsComponent(gameStatus) {

    // console.log("SettingsComponent created")

    const localState = {
        gameStatus: gameStatus,
        gridSizeBlockValues: null,
        pointsToWinBlockValues: null,
        pointsToLoseBlockValues: null, 
        soundStatus: null
    }

    
    const element = document.createElement('div');
    element.classList.add('settings');
    element.id = 'settings';

    render(element, localState)

    return {
        element,
        cleanup: () => {},
    };
}

async function render(element, localState) {
    // console.log('Setting component render')

    const gridSizeBlockValuesPromise = getGridSizeBlockValues()
    const gridSizeBlockValues = await gridSizeBlockValuesPromise;

    const getPointsToWinBlockValuesPromise = getPointsToWinBlockValues()
    const pointsToWinBlockValues = await getPointsToWinBlockValuesPromise;

    const getPointsToLoseBlockValuesPromise = getPointsToLoseBlockValues()
    const pointsToLoseBlockValues = await getPointsToLoseBlockValuesPromise;

    const soundStatusPromise = getSoundStatus();
    const soundStatus = await soundStatusPromise;

    function stringToBoolean(str) {
        if (typeof str === "string" && str === 'true') {
            return true;
        }
        return false;
    }

    const soundStatusResponseBoolean = stringToBoolean(soundStatus)
    
    element.innerHTML = '';

    const burgerComponent = BurgerComponent();

    const gridSizeComponent = GridSizeComponent(gridSizeBlockValues, localState.gameStatus);

    const pointsToWinComponent = PointsToWinComponent(pointsToWinBlockValues,  localState.gameStatus);

    const pointsToLoseComponent = PointsToLoseComponent(pointsToLoseBlockValues,  localState.gameStatus);

    const soundComponent = SoundComponent(soundStatusResponseBoolean);

    element.append(
        burgerComponent.element,
        gridSizeComponent.element,
        pointsToWinComponent.element,
        pointsToLoseComponent.element,
        soundComponent.element
    );
}