import { subscribe } from "../../../../core/state-manger.proxy.js";
import { stringToBoolean } from "../SringToBoolean/StringToBoolean.component.js";


export function ButtonComponent(id, title,  buttonDisableStatus, callback) {
    console.log("ButtonComponent created")
// console.log(callback)
    localStorage.setItem(buttonDisableStatus.key, buttonDisableStatus.value)

    const localState = {
        id: id,
        title: title,
        buttonDisableStatus: buttonDisableStatus,
        callback
    }
    const element = document.createElement('button');
    element.classList.add(localState.id)
    element.id = localState.id;
    element.append(localState.title.toUpperCase());
    element.disabled = stringToBoolean(localStorage.getItem(localState.buttonDisableStatus.key))
    element.addEventListener('click', () => {
        localState.callback();
    })

    return {
        element,
        cleanup: () => {},
    };
}
