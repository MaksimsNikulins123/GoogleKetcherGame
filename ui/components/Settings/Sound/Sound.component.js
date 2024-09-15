import { getSoundStatus, subscribe, unsubscribe } from "../../../../core/state-manger.proxy.js";
import { CheckboxComponent } from "../../common/Checkbox/Checkbox.componenet.js";
import { SetTitle } from "../../common/SetTitle/SetTitle.component.js";

export function SoundComponent() {

    const localState = {
        prevSoundStatus: null,     
        cleanupFunctions: [],
        title: null
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

    const soundStatusPromise = getSoundStatus();
    const soundStatus = await soundStatusPromise;
    
    function stringToBoolean(str) {
        if (typeof str === "string" && str === 'true') {
          return true;
        }
        return false;
      }

    const soundStatusResponseBoolean = stringToBoolean(soundStatus)
    
    localState.prevSoundStatus = soundStatusResponseBoolean;

    localState.prevSoundStatus ?  localState.title = 'Sound on' :  localState.title = 'Sound off'

    localState.cleanupFunctions.forEach(cleanupFunction => cleanupFunction());
    localState.cleanupFunctions = [];
    
    element.innerHTML = '';

    const soundTitleComponent = SetTitle(localState.title);

    // const soundTitleComponent = SoundTitleComponent(soundStatusResponseBoolean);

    const checkboxComponent = CheckboxComponent(soundStatusResponseBoolean)

    // console.log(checkboxComponent)
    
    element.append(soundTitleComponent.element, checkboxComponent.element
    );
    // console.log("CheckboxComponent render")
    
}