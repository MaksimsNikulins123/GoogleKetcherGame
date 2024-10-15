import { EVENTS } from "../../../../core/constans.js";
import { getGooglePoints, subscribe } from "../../../../core/state-manger.proxy.js";


export function GooglePointsComponent() {

    const element = document.createElement('div');

    let observer = (e) => {
        console.log(e)
    if (e.name === EVENTS.GOOGLE_SCORE_CHANGED){
        render(element);
    };
    }
    // let observer = (e) => {
    //     console.log(e);
    //     // if ([EVENTS.GOOGLE_SCORES_CHANGED, EVENTS.PLAYER1_MOVED, EVENTS.PLAYER2_MOVED].every(name => name !== e.name)) return;
    //     // if (e.name === EVENTS.GOOGLE_SCORES_CHANGED){
    //     //     render(element, );
    //     // };

    //     // if (e.payload.prevPosition.x === x && e.payload.prevPosition.y === y) {
    //     //     render(element, x, y, localState);
    //     // }
    //     // if (e.payload.newPosition.x === x && e.payload.newPosition.y === y) {
    //     //     render(element, x, y, localState);
    //     // }

    // };

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
