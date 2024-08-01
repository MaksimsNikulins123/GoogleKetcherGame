export function CheckboxComponent() {
    // console.log("CheckboxComponent created")
    const element = document.createElement('container');
    element.classList.add('soundSwitcher');
    
    render(element)

    return {
        element,
        cleanup: () => {},
    };
}

async function render(element) {
    // console.log("CheckboxComponent render")
    const soundLabel = document.createElement('label');
    soundLabel.classList.add('switch');

    const soundInput = document.createElement('input');
    soundInput.classList.add('switch__input');
    soundInput.setAttribute('type', 'checkbox');

    soundInput.addEventListener('change',(e) => {
        console.log('Changed sound status')
        console.log(e)
    } );

    const soundSpan = document.createElement('span');
    soundSpan.classList.add('switch__slider');


    soundLabel.append(soundInput, soundSpan);

    element.append(soundLabel)
}