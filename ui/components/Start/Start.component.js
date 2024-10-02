import {
    start
} from "../../../core/state-manger.proxy.js";
import { SettingsComponent } from "../Settings/Settings.component.js";

export function StartComponent() {
    // console.log("StartComponent created")
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
    const button = document.createElement('button');
    button.classList.add('start-btn')
    button.id = 'start-btn';
    button.append('START GAME');

    // const settingsComponent = SettingsComponent();

    button.addEventListener('click', () => {
        // console.log(settingsComponent)
        start();
    })
    element.append(button);
}