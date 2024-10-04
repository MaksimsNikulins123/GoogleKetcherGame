
import { EVENTS, POINST_TO_WIN_BLOCK_VALUES } from "../../../../core/constans.js";
import { saveValue, setValue, subscribe } from "../../../../core/state-manger.proxy.js";
import { DropDownListComponent } from "../../common/DropDownList/DropDownList.component.js";
import { SetTitle } from "../../common/SetTitle/SetTitle.component.js";

export function PointsToWinComponent(pointsToWinBlockValues) {
    //  console.log("PointsToWin componenet created")
    const getValue = (e) => {
        localState.buttonTitle = e.newValue;
        saveValue({name: EVENTS.SAVE_POINTS_TO_WIN_SETTINGS_VALUE, payload: localState.buttonTitle})
        setValue(EVENTS.POINTS_TO_WIN_CHANGED, e)
        }

    const localState = {
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

    const dropDownListComponent = DropDownListComponent(localState.buttonTitle, localState.list, localState.getValue);

    element.append(pointsToWinTitleComponent.element, dropDownListComponent.element);
  
}