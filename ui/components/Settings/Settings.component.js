import { GridSizeComponent } from "./GridSize/GridSize.component.js";
import { PointsToLoseComponent } from "./PointsToLose/PointsTolose.component.js";
import { PointsToWinComponent } from "./PointsToWin/PointsToWin.component.js";
import { SoundComponent } from "./Sound/Sound.component.js";


export function SettingsComponent() {
    //  console.log("SettingsComponent created")
    const element = document.createElement('div');
    element.classList.add('settings');

    render(element)

    return {
        element,
        cleanup: () => {},
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