import {stringToBoolean } from './../common/SringToBoolean/StringToBoolean.component.js';
import {
    // saveSettings,
    start,
    subscribe
} from "../../../core/state-manger.proxy.js";
import { EVENTS } from '../../../core/constans.js';

export function StartComponent(startButtonStatus) {
    console.log('StartButton component created')
    // console.log(typeof(startButtonStatus))

    const localState = {
        buttonDisabilityStatus: stringToBoolean(startButtonStatus)
    }

    // console.log("StartComponent created")
    const element = document.createElement('div');
    element.classList.add('content');

    subscribe((e) => {
        if(e.name === EVENTS.START_BUTTON_STATUS_CHANGED) {
            localState.buttonDisabilityStatus = e.payload
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
    console.log("StartComponent render")

    element.innerHTML = '';
    const button = document.createElement('button');
    button.classList.add('start-btn')
    button.id = 'start-btn';
    button.append('START GAME');
    button.disabled = localState.buttonDisabilityStatus



    button.addEventListener('click', () => {
        // saveSettings()
        start();
    })
    element.append(button);
}