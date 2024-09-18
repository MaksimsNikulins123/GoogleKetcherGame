

export function CheckboxComponent(soundStatus, getValue) {
    // console.log("CheckboxComponent created")

    const localState = {
        isChecked: soundStatus,
        getValue: getValue
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
    // console.log('CheckboxComponent render')

    element.innerHTML = '';

    const soundLabel = document.createElement('label');
    soundLabel.classList.add('switch');
    

    const soundInput = document.createElement('input');
    soundInput.classList.add('switch__input');
    soundInput.setAttribute('type', 'checkbox');
    soundInput.setAttribute('id', 'checkbox');
    soundInput.checked = localState.isChecked;

    soundInput.addEventListener('change',async (e) => {
        
        const prevValue = localState.isChecked
        const newValue = e.target.checked

        // console.log(e.target.checked)
        localState.isChecked = e.target.checked

        if(prevValue !== newValue) {
            localState.getValue(e.target.checked)
        }

        
    } );

    const soundSpan = document.createElement('span');
    soundSpan.classList.add('switch__slider');

    soundLabel.append(soundInput, soundSpan);

    element.append(soundLabel)
  
}