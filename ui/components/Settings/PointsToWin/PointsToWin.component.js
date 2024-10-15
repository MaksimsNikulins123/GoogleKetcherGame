
import { EVENTS, POINST_TO_WIN_BLOCK_VALUES } from "../../../../core/constans.js";
import { setValue, subscribe } from "../../../../core/state-manger.proxy.js";
import { DropDownListComponent } from "../../common/DropDownList/DropDownList.component.js";
import { SetTitle } from "../../common/SetTitle/SetTitle.component.js";

export function PointsToWinComponent(pointsToWinBlockValues,  gameStatus) {
    //  console.log("PointsToWin componenet created")
    if(pointsToWinBlockValues.button.title !== POINST_TO_WIN_BLOCK_VALUES.button.title) {
        localStorage.setItem('pointsToWin', pointsToWinBlockValues.button.title)
    }
    const getValue = (e) => {
        localState.buttonTitle = e.newValue;
        localStorage.setItem("pointsToWin", e.newValue);
        // saveValue({name: EVENTS.SAVE_POINTS_TO_WIN_SETTINGS_VALUE, payload: localState.buttonTitle})
        setValue(EVENTS.POINTS_TO_WIN_CHANGED, e)
        }

    const localState = {
        gameStatus: gameStatus,
        title: pointsToWinBlockValues.title,
        buttonTitle: pointsToWinBlockValues.button.title,
        list: pointsToWinBlockValues.button.payload,
        cleanupFunctions: [],
        getValue
        
    }
    const element = document.createElement('div');
    element.classList.add('pointsToWinBlock');

    subscribe((e) => {
        if(e.name === EVENTS.POINTS_TO_WIN_CHANGED) {
            render(element, localState)
        }
        
    })

    render(element, localState)

    return {
        element,
        cleanup: () => { },
    };
}

async function render(element, localState) {
  
    // console.log("PointsToWinComponent render")

    element.innerHTML = '';


    const pointsToWinTitleComponent = SetTitle(localState.title);

    const dropDownListComponent = DropDownListComponent(localState.buttonTitle, localState.list, localState.getValue, localState.gameStatus);

    element.append(pointsToWinTitleComponent.element, dropDownListComponent.element);
  
}