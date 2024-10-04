import { EVENTS } from '../../../../core/constans.js';
import { saveValue, setValue, subscribe, } from '../../../../core/state-manger.proxy.js';
import { SetTitle } from '../../common/SetTitle/SetTitle.component.js';
import { DropDownListComponent } from './../../common/DropDownList/DropDownList.component.js';

export function GridSizeComponent(gridSizeBlockValues) {
    //  console.log("GridSizeComponent created")

    const getValue = (e) => {
        localState.buttonTitle = e.newValue;
        saveValue({name: EVENTS.SAVE_GRID_SIZE_SETTINGS_VALUE, payload: localState.buttonTitle})
        setValue(EVENTS.GRID_SIZE_CHANGED, e)
        }

    const localState = {
        title: gridSizeBlockValues.title,
        buttonTitle:gridSizeBlockValues.button.title,
        list:gridSizeBlockValues.button.payload,
        cleanupFunctions: [],
        getValue
        
    }

    const element = document.createElement('div');
    element.classList.add('gridSizeBlock');


    
subscribe((e) => {
    if(e.name === EVENTS.GRID_SIZE_CHANGED) {
        render(element, localState)
    }
    
})

    render(element, localState)

    return {
        element,
        cleanup: () => {
            // localState.cleanupFunctions.forEach(cleanupFunction => cleanupFunction())
        },
    };
}

async function render(element, localState) {
    // console.log('Grid size component render')

    element.innerHTML = '';

    const gridSizeTitleComponent = SetTitle(localState.title);

    const dropDownListComponent = DropDownListComponent(localState.buttonTitle, localState.list, localState.getValue);

    element.append(gridSizeTitleComponent.element, dropDownListComponent.element);
   
}