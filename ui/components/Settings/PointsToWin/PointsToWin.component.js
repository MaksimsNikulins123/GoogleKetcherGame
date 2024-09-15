
import { getPointsToWinBlockValues } from "../../../../core/state-manger.proxy.js";
import { DropDownListComponent } from "../../common/DropDownList/DropDownList.component.js";
import { SetTitle } from "../../common/SetTitle/SetTitle.component.js";

export function PointsToWinComponent() {
    //  console.log("PointsToWin created")
    const element = document.createElement('div');
    element.classList.add('pointsToWinBlock');

    render(element)

    return {
        element,
        cleanup: () => { },
    };
}

async function render(element) {

    const getPointsToWinBlockValuesPromise = getPointsToWinBlockValues()
    const pointsToWinBlockValues = await getPointsToWinBlockValuesPromise;

    const title = pointsToWinBlockValues.title
    const data = pointsToWinBlockValues.button

    element.innerHTML = '';

    // const title = 'Points to win';

    const pointsToWinTitleComponent = SetTitle(title);

    // const data = {
    //     title: 'Select points to win',
    //     payload: [10, 20, 30, 40, 50]
    // };

    const dropDownListComponent = DropDownListComponent(data);

    element.append(pointsToWinTitleComponent.element, dropDownListComponent.element);
    // console.log("PointsToWinComponent render")
}