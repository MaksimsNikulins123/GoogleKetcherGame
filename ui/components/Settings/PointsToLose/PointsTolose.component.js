import { DropDownListComponent } from "../../common/DropDownList/DropDownList.component.js";
import { SetTitle } from "../../common/SetTitle/SetTitle.component.js";

export function PointsToLoseComponent() {
    //  console.log("PointsToLoseComponent created")
    const element = document.createElement('div');
element.classList.add('pointsToLoseBlock');

    render(element)

    return {
        element,
        cleanup: () => {},
    };
}

async function render(element) {
    element.innerHTML = '';

    const title =  'Points to lose';

    const data = {
        title: 'Select points to lose',
        payload: [10, 20, 30, 40, 50]
    }
    
    const pointsToWinTitleComponent = SetTitle(title);

    const dropDownListComponent = DropDownListComponent(data);
    
    element.append(pointsToWinTitleComponent.element, dropDownListComponent.element);
    // console.log("PointsToLoseComponent render")
  
}