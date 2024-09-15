import { getGridSizeButtonValue } from '../../../../core/state-manger.proxy.js';
import { SetTitle } from '../../common/SetTitle/SetTitle.component.js';
import { DropDownListComponent } from './../../common/DropDownList/DropDownList.component.js';

export function GridSizeComponent() {
     //  console.log("GridSizeComponent created")

     const localState = {
        prevSoundStatus: null,     
        cleanupFunctions: [],
        title: null
    };
     const element = document.createElement('div');
    element.classList.add('gridSizeBlock');

    render(element)

    return {
        element,
        cleanup: () => {},
    };
}

async function render(element) {

    const gridSizeButtonValuePromise = getGridSizeButtonValue()
    const gridSizeButtonValue = await gridSizeButtonValuePromise;

    const data = gridSizeButtonValue

    element.innerHTML = '';

    const title = 'Grid size';

    const gridSizeTitleComponent = SetTitle(title);

    const dropDownListComponent = DropDownListComponent(data);

    element.append(gridSizeTitleComponent.element, dropDownListComponent.element);
     // console.log("GridSizeComponent render")
}