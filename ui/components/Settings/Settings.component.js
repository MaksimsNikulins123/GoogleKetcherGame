import { GAME_STATUSES } from "../../../core/constans.js";
import {
    getGridSizeBlockValues,
    getPointsToLoseBlockValues,
    getPointsToWinBlockValues,
    getSoundStatus,
    // subscribe
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


export function SettingsComponent() {

    console.log("SettingsComponent created")

    const localState = {
        gridSizeBlockValues: null,
        pointsToWinBlockValues: null,
        pointsToLoseBlockValues: null, 
        soundStatus: null
    }

    
    const element = document.createElement('div');
    element.classList.add('settings');
    element.id = 'settings';

    window.onresize = function () {
        if (window.innerWidth >= 1000) {  
            element.classList.remove('active')
        }
    }
    // subscribe((e) => {
    //     console.log(e)
    //     if(e.name === EVENTS.GAME_STATUS_CHANGED) {
    //         render(element, localState);
    //     }
        
    // })
    // subscribe(() => {
    //     render(element, localState);
    // })

    render(element, localState)

    return {
        element,
        cleanup: () => {},
    };
}

async function render(element) {
    console.log('Setting component render')

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

    // const settingElement = element
    
    element.innerHTML = '';

    const burgerComponent = BurgerComponent();

    const gridSizeComponent = GridSizeComponent(gridSizeBlockValues);

    const pointsToWinComponent = PointsToWinComponent(pointsToWinBlockValues);

    const pointsToLoseComponent = PointsToLoseComponent(pointsToLoseBlockValues);

    const soundComponent = SoundComponent(soundStatusResponseBoolean);

    element.append(
        burgerComponent.element,
        gridSizeComponent.element,
        pointsToWinComponent.element,
        pointsToLoseComponent.element,
        soundComponent.element
    );
}