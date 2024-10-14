import {
    EVENTS,
    POINST_TO_LOSE_BLOCK_VALUES,

} from "../../../../core/constans.js";
import {
    setValue,
    subscribe
} from "../../../../core/state-manger.proxy.js";
import {
    DropDownListComponent
} from "../../common/DropDownList/DropDownList.component.js";
import {
    SetTitle
} from "../../common/SetTitle/SetTitle.component.js";

export function PointsToLoseComponent(pointsToLoseBlockValues) {
    // console.log("PointsToLoseComponent created")

    if(pointsToLoseBlockValues.button.title !== POINST_TO_LOSE_BLOCK_VALUES.button.title) {
        localStorage.setItem('pointsToLose', pointsToLoseBlockValues.button.title)
    }
    const getValue = (e) => {
        localState.buttonTitle = e.newValue;
        localStorage.setItem("pointsToLose", e.newValue);
        // saveValue({name: EVENTS.SAVE_POINTS_TO_LOSE_SETTINGS_VALUE, payload: localState.buttonTitle})
        setValue(EVENTS.POINTS_TO_LOSE_CHANGED, e)
    }
    const localState = {
        title: pointsToLoseBlockValues.title,
        buttonTitle: pointsToLoseBlockValues.button.title,
        list: pointsToLoseBlockValues.button.payload,
        cleanupFunctions: [],
        getValue
    }
    
    const element = document.createElement('div');
    element.classList.add('pointsToLoseBlock');

    subscribe((e) => {
        if(e.name === EVENTS.POINTS_TO_LOSE_CHANGED) {
            render(element, localState)
        }
        
    })

    render(element, localState)

    return {
        element,
        cleanup: () => {},
    };
}

async function render(element, localState) {

    // console.log("PointsToLoseComponent render")

    element.innerHTML = '';


    const pointsToWinTitleComponent = SetTitle(localState.title);

    const dropDownListComponent = DropDownListComponent(localState.buttonTitle, localState.list, localState.getValue);

    element.append(pointsToWinTitleComponent.element, dropDownListComponent.element);


}