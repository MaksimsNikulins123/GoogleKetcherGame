
import {
    // saveSettings,
    start,
} from "../../../core/state-manger.proxy.js";


export function StartComponent() {

    console.log("StartComponent created")
    const element = document.createElement('div');
    element.classList.add('content');

    render(element)

    return {
        element,
        cleanup: () => {},
    };
}

async function render(element) {
    console.log("StartComponent render")

    element.innerHTML = '';
    const button = document.createElement('button');
    button.classList.add('start-btn')
    button.id = 'start-btn';
    button.append('START GAME');
    button.disabled = true



    button.addEventListener('click', () => {
        // saveSettings()
        start();
    })
    element.append(button);
}