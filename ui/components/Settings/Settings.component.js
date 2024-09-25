import {
    getGridSizeBlockValues,
    getPointsToLoseBlockValues,
    getPointsToWinBlockValues,
    getSoundStatus
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
    // console.log("SettingsComponent created")
    const element = document.createElement('div');
    element.classList.add('settings');

    window.onresize = function () {
        // const elementBurger = document.createElement('div');

        if (window.innerWidth >= 1000) {
            // elementBurger.classList.add('burger')
            // elementBurger.append(element.element)
            element.classList.remove('active')
        }
        // else  element.classList.remove('burger')
            // else elementBurger.classList.add('burger')  
    }

    render(element)

    return {
        element,
        cleanup: () => {},
    };
}

async function render(element) {
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

    const settingElement = element
    
    element.innerHTML = '';

    const burgerComponent = BurgerComponent(settingElement);

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