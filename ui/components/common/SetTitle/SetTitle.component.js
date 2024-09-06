import { subscribe } from "../../../../core/state-manger.proxy.js";

export function SetTitle(value) {

    const localState = {
        renderVersion: 0
    }
   
    const element = document.createElement('h3');
    // element.classList.add(value.replace(/\s+/g, ''));


    subscribe(() => {
        render(element, value, localState);
    })

    render(
        element, 
        value, 
        localState)

    
    return {
        element,
        cleanup: () => {},
    };
}

async function render(element, value, localState) {
    localState.renderVersion++;
    const currentRenderVersion = localState.renderVersion;
    element.innerHTML = '';

    if(currentRenderVersion < localState.renderVersion) {
        console.log('New version of rendering');
        return;
    }

    element.append(value);
    
}