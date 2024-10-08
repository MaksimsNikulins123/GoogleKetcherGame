// import classes from './index.module.scss'
// import classes from './index.css'
import { EVENTS } from "../../../core/constans.js";
import {
    getGooglePoints,
    getPlayerPoints,
    subscribe,
    unsubscribe
} from "../../../core/state-manger.proxy.js";

export function ResultPanelComponent() {
    // console.log("ResultPanelComponent created")
    const element = document.createElement('div');

    element.classList.add('result-panel');

    const observer = (e) => {

        if(e.name === EVENTS.SCORES_CHANGED) {
            render(element);
        }
        
    }
    subscribe(observer)

    render(element);

    return {
        element,
        cleanup: () => {unsubscribe(observer)}
    };
}

async function render(element) {
    // console.log("ResultPanelComponent render")

    element.innerHTML = '';

    const googlePoints = await getGooglePoints();
    const player1Points = await getPlayerPoints(1);
    const player2Points = await getPlayerPoints(2);


    element.append(`Player1: ${player1Points}, Player2: ${player2Points}, Google: ${googlePoints}`)
}