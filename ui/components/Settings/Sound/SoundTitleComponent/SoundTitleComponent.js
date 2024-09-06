import { getSoundStatus, subscribe, unsubscribe } from "../../../../../core/state-manger.proxy.js";
// import { CheckboxComponent } from "../../common/Checkbox/Checkbox.componenet.js";
import { SetTitle } from "../../../common/SetTitle/SetTitle.component.js";

export function SoundTitleComponent(soundStatus) {

    const localState = {
        title: null,
        prevSoundStatus: soundStatus,     
        cleanupFunctions: [],
    };
    //  console.log("CheckboxComponent created")
    const element = document.createElement('div');
    element.classList.add('SoundBlock');

    subscribe(() => {
        render(element, localState);
    })

    render(element, localState)

    


    return {
        element,
        cleanup: () => {unsubscribe(render(element, localState))},
    };
}



async function render(element, localState) {


    // const soundStatusPromise = getSoundStatus();
    // const soundStatus = await soundStatusPromise;
    
    // function stringToBoolean(str) {
    //     if (typeof str === "string") {
    //       return str.toLowerCase() === "true";
    //     }
    //     return false;
    //   }

    // const soundStatusRequestBoolean = stringToBoolean(soundStatus)
    
    // localState.prevSoundStatus = soundStatusRequestBoolean;
    
    localState.prevSoundStatus ?  localState.title = 'Sound on' :  localState.title = 'Sound off'

    localState.cleanupFunctions.forEach(cleanupFunction => cleanupFunction());
    localState.cleanupFunctions = [];


    element.innerHTML = '';

    const soundTitleComponent = SetTitle(localState.title);
    
    element.append(soundTitleComponent.element);
    // console.log("CheckboxComponent render")
    
}