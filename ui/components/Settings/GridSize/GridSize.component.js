import { getGridSizeBlockValues } from '../../../../core/state-manger.proxy.js';
import { SetTitle } from '../../common/SetTitle/SetTitle.component.js';
import { DropDownListComponent } from './../../common/DropDownList/DropDownList.component.js';

export function GridSizeComponent() {
    //  console.log("GridSizeComponent created")

    const element = document.createElement('div');
    element.classList.add('gridSizeBlock');

    render(element)

    return {
        element,
        cleanup: () => { },
    };
}

async function render(element) {

    const gridSizeBlockValuesPromise = getGridSizeBlockValues()
    const gridSizeBlockValues = await gridSizeBlockValuesPromise;

    const title = gridSizeBlockValues.title
    const data = gridSizeBlockValues.button

    element.innerHTML = '';

    const gridSizeTitleComponent = SetTitle(title);

    const dropDownListComponent = DropDownListComponent(data);

    element.append(gridSizeTitleComponent.element, dropDownListComponent.element);
    // console.log("GridSizeComponent render")
}