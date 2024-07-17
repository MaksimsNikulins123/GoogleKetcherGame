import {
    playAgain
} from "../../../core/state-manger.proxy.js";

export function LoseComponent() {
    const element = document.createElement('div');

    render(element)

    return {
        element,
        cleanup: () => {},
    };
}

async function render(element) {
    const titleElement = document.createElement('h1');
    titleElement.append('You lose, Google win');

    element.append(titleElement);

    const button = document.createElement('button');
    button.append('PLAY AGAIN');

    button.addEventListener('click', () => {
        playAgain();
    })
    element.append(button);
}