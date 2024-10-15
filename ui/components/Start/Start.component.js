
import { stringToBoolean } from './../common/SringToBoolean/StringToBoolean.component.js';
import {  

    start,
} from "../../../core/state-manger.proxy.js";


export function StartComponent(status) {
    // console.log("StartComponent created")

    localStorage.setItem('startButtonDisableStatus', status)

    
    const element = document.createElement('div');
    element.classList.add('content');

    render(element)

    return {
        element,
        cleanup: () => {},
    };
}

async function render(element) {
    // console.log("StartComponent render")

    element.innerHTML = '';
    const button = document.createElement('button');
    button.classList.add('start-btn')
    button.id = 'start-btn';
    button.append('START GAME');
    button.disabled = stringToBoolean(localStorage.getItem('startButtonDisableStatus'))
    button.addEventListener('click', () => {
        // saveSettings()
        start();
    })
    element.append(button);
}