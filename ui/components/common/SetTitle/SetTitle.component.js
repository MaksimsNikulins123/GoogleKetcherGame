import { SOUND_STATUSES } from "../../../../core/constans.js";
import { getSoundStatus, subscribe, unsubscribe } from "../../../../core/state-manger.proxy.js";


export function SetTitle(value) {

    const localState = {
        renderVersion: 0
    }
   
    const element = document.createElement('h3');
    element.classList.add(value.replace(/\s+/g, ''));

    let observer = (e) => {
        console.log(e.payload);
        
        // if(e.target.checked) {
        //     render(element, SOUND_STATUSES.ON)
        // } else {
        //     render(element, SOUND_STATUSES.OFF)
        // }

    };

    subscribe(observer);


    render(
        element, 
        value, 
        localState)

    
    return {
        element,
        cleanup: () => {unsubscribe(observer)},
    };
}

async function render(element, value, localState) {
    localState.renderVersion++;
    const currentRenderVersion = localState.renderVersion;
    element.innerHTML = '';

    // const soundStausStartValue = value;
    // const soundStatus = await getSoundStatus();

    // if(soundStausStartValue !== soundStatus) {
    //     element.append(soundStatus);
    // } else {
        
    // }

    if(currentRenderVersion < localState.renderVersion) {
        console.log('New version of rendering');
        return;
    }

    element.append(value);
    
}