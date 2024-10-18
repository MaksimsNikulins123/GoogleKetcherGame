import {
    playAgain
} from "../../../core/state-manger.proxy.js";
import { ButtonComponent } from "../common/Button/Button.component.js";

export function LoseComponent() {
    console.log('Lose component created')
    const localState = {
        buttonId: 'start-btn',
        buttonTitle: 'play again',
        buttonDisableStatus: {
            key: 'playAgainButtonDisableStatus',
            value: 'false'
        },
        playAgain
    }
    const element = document.createElement('div');
    element.classList.add('content')

    render(element, localState)

    return {
        element,
        cleanup: () => {},
    };
}

async function render(element, localState) {
    const titleElement = document.createElement('h1');
    titleElement.append('You lose, Google win');


    const loseButtonComponent = ButtonComponent(localState.buttonId, localState.buttonTitle,  localState.buttonDisableStatus, localState.        playAgain
    )
    element.append(titleElement, loseButtonComponent.element);
    // element.append(titleElement);

    // const button = document.createElement('button');
    // button.append('PLAY AGAIN');

    // button.addEventListener('click', () => {
    //     playAgain();
    // })
    // element.append(button);
}