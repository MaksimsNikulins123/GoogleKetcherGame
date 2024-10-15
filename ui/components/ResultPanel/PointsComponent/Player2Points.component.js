import { EVENTS } from "../../../../core/constans.js";
import { getPlayerPoints, subscribe } from "../../../../core/state-manger.proxy.js";

export function Player2PointsComponent() {

    const element = document.createElement('div');

    let observer = (e) => {
        if (e.name === EVENTS.PLAYER2_SCORES_CHANGED){
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

    const player1Points = await getPlayerPoints(2);

    element.append(`Player2: ${player1Points}`)
}