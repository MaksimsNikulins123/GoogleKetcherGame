import { getSoundStatus, toggleSound } from "../../../../core/state-manger.proxy.js";


export function CheckboxComponent(soundStatus) {
    // console.log("CheckboxComponent created")

    const localState = {
        isChecked: soundStatus
    }


    const element = document.createElement('div');
    element.classList.add('soundSwitcher');

    render(element, localState)

    return {
        element,
        cleanup: () => {},
    };
}



async function render(element, localState) {
  
    // console.log(`CheckboxComponent render: ${localState.renderCounter} `)
    element.innerHTML = '';

    const soundLabel = document.createElement('label');
    soundLabel.classList.add('switch');
    

    const soundInput = document.createElement('input');
    soundInput.classList.add('switch__input');
    soundInput.setAttribute('type', 'checkbox');
    soundInput.setAttribute('id', 'checkbox');
    soundInput.checked = localState.isChecked;

    soundInput.addEventListener('change',async (e) => {
        toggleSound(e.target.checked);  
    } );

    const soundSpan = document.createElement('span');
    soundSpan.classList.add('switch__slider');

    soundLabel.append(soundInput, soundSpan);

    element.append(soundLabel)
    // console.log(checkbox.checked = true)
    // console.log(element.getElement ('input'))
}