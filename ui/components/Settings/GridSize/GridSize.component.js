import { SetTitle } from '../../common/SetTitle/SetTitle.component.js';
import { DropDownListComponent } from './../../common/DropDownList/DropDownList.component.js';

export function GridSizeComponent() {
     //  console.log("GridSizeComponent created")
    const element = document.createElement('div');
    element.classList.add('gridSizeBlock');

    render(element)

    return {
        element,
        cleanup: () => {},
    };
}

async function render(element) {
    element.innerHTML = '';

    const title = 'Grid size';

    const gridSizeTitleComponent = SetTitle(title);

    const data = {
        title: 'Select grid size',
        payload: ['5:5', '10:10', '15:15', '20:20', '25:25','30:30']
    };

    const dropDownListComponent = DropDownListComponent(data);

    element.append(gridSizeTitleComponent.element, dropDownListComponent.element);
     // console.log("GridSizeComponent render")
}