import { EVENTS } from "../../../../core/constans.js";
import { saveValue, setValue, subscribe,} from "../../../../core/state-manger.proxy.js";
import { CheckboxComponent } from "../../common/Checkbox/Checkbox.componenet.js";
import { SetTitle } from "../../common/SetTitle/SetTitle.component.js";

export function SoundComponent(soundStatus) {
    // console.log("Sound Component created")

    const getValue = (e) => {
        localState.soundStatus = e;
        saveValue({name: EVENTS.SAVE_SOUND_STATUS, payload: localState.soundStatus})
        setValue(EVENTS.SOUND_STATUS_CHANGED, e)
        }

    const localState = {
        soundStatus: soundStatus,   
        cleanupFunctions: [],
        title: null,
        getValue
    };

    
    const element = document.createElement('div');
    element.classList.add('SoundBlock');

    subscribe((e) => {
        if(e.name === EVENTS.SOUND_STATUS_CHANGED) {
            render(element, localState);
        }
        
    })
    
    render(element, localState)


    return {
        element,
        cleanup: () => {},
    };
}

async function render(element, localState) {
    
    // console.log("Sound Component render")
    
    localState.soundStatus ?  localState.title = 'Sound on' :  localState.title = 'Sound off'

    
    element.innerHTML = '';

    const soundTitleComponent = SetTitle(localState.title);

    const checkboxComponent = CheckboxComponent(localState.soundStatus, localState.getValue)
    
    element.append(soundTitleComponent.element, checkboxComponent.element
    );
   
    
}