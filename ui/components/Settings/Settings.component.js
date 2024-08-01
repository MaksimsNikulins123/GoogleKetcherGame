import { EVENTS } from "../../../core/constans.js";
import { subscribe, unsubscribe } from "../../../core/state-manger.proxy.js";
import { CheckboxComponent } from "../common/Checkbox/Checkbox.componenet.js";
import { GridSizeComponent } from "./GridSize/GridSize.component.js";
import { PointsToLoseComponent } from "./PointsToLose/PointsTolose.component.js";
import { PointsToWinComponent } from "./PointsToWin/PointsToWin.component.js";
import { SoundComponent } from "./Sound/Sound.component.js";


export function SettingsComponent() {
    //  console.log("SettingsComponent created")
    const element = document.createElement('div');
    element.classList.add('settings');


    const observer = (e) => {

        if(e.name === EVENTS.SOUND_STATUS_CHANGED) {
            render(element);
        }
        
    };

    subscribe(observer);

    render(element)

    return {
        element,
        cleanup: () => {unsubscribe(observer)},
    };
}

async function render(element) {
    element.innerHTML = '';
    
    const gridSizeComponent = GridSizeComponent();
   
    const pointsToWinComponent = PointsToWinComponent();
    
    const pointsToLoseComponent = PointsToLoseComponent();
    
    const soundComponent = SoundComponent();
   
    element.append(
        gridSizeComponent.element, 
        pointsToWinComponent.element, 
        pointsToLoseComponent.element, 
        soundComponent.element
    );
}