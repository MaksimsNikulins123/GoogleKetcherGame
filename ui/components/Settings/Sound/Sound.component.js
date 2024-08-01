import { CheckboxComponent } from "../../common/Checkbox/Checkbox.componenet.js";
import { SetTitle } from "../../common/SetTitle/SetTitle.component.js";

export function SoundComponent() {
    //  console.log("CheckboxComponent created")
    const element = document.createElement('div');
element.classList.add('SoundBlock');

    render(element)

    return {
        element,
        cleanup: () => {},
    };
}

async function render(element) {
    element.innerHTML = '';
    
    const title = 'Sound off';

    const soundTitleComponent = SetTitle(title);

    const data = {
        soundStatus: false
    }

    const checkboxComponent = CheckboxComponent(data)
    
    element.append(soundTitleComponent.element, checkboxComponent.element);
    // console.log("CheckboxComponent render")
    
}