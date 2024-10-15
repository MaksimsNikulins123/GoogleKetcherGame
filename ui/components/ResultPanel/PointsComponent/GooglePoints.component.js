import { EVENTS } from "../../../../core/constans.js";
import { getGooglePoints, subscribe } from "../../../../core/state-manger.proxy.js";


export function GooglePointsComponent() {
    // console.log('GooglePoints compenent created')
    const element = document.createElement('div');

    let observer = (e) => {
        // console.log(e)
    if (e.name === EVENTS.GOOGLE_SCORE_CHANGED){
        render(element);
    };
    }

    subscribe(observer);

    render(element)

    return {
        element,
        cleanup: () => {
            // console.log(`Cell cleanup was called ${x}','${y}`);
            // unsubscribe(observer);
        }
    };


    

}

async function render(element) {
    // console.log('GooglePoints compenent render')
    element.innerHTML = '';

    const googlePoints = await getGooglePoints();

    element.append(`Google: ${googlePoints}`)
    // 
    // const player1Points = await getPlayerPoints(1);
    // const player2Points = await getPlayerPoints(2);

    // element.append(`Google: ${googlePoints}`)
    // element.append(`Player1: ${player1Points}`)
    // element.append(`Player2: ${player2Points}`)
}
