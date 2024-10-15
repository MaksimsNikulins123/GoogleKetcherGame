import { EVENTS } from "../../../../core/constans.js";
import { getPlayerPoints, subscribe } from "../../../../core/state-manger.proxy.js";

export function Player1PointsComponent() {

    const element = document.createElement('div');

    let observer = (e) => {
    if (e.name === EVENTS.PLAYER1_SCORES_CHANGED){
        render(element);
    };
    }

    subscribe(observer);



    render(element);

    return {
        element,
        cleanup: () => {}
    };

}

async function render(element) {
    
    element.innerHTML = '';

    const player1Points = await getPlayerPoints(1);

    element.append(`Player1: ${player1Points}`)
}