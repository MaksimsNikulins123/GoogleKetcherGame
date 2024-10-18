import {  
    start,
} from "../../../core/state-manger.proxy.js";
import { ButtonComponent } from '../common/Button/Button.component.js';


export function StartComponent(status) {
    // console.log("StartComponent created")

    const localState = {
        buttonId: 'start-btn',
        buttonTitle: 'start game',
        buttonDisableStatus: {
            key: 'startButtonDisableStatus',
            value: status
        },
        start
    }
    
    const element = document.createElement('div');
    element.classList.add('content');

    render(element, localState)

    return {
        element,
        cleanup: () => {},
    };
}

async function render(element, localState) {
    // console.log("StartComponent render")

    const startButtonComponent = ButtonComponent(localState.buttonId, localState.buttonTitle,  localState.buttonDisableStatus, localState.start)
    element.append(startButtonComponent.element);
}