import {
    EVENTS
} from "../../../../core/constans.js";
import {
    getGooglePosition,
    getPlayerPosition,
    subscribe,
    unsubscribe
} from "../../../../core/state-manger.proxy.js";
import {
    GoogleComponent
} from "../../common/Google/Google.component.js";
import {
    PlayerComponent
} from "../../common/Player/Player.component.js";

export function CellComponent(x, y) {
    const localState = {
        renderVersion: 0
    }

    // console.log(`Cell component created ${x}','${y}`)
    const element = document.createElement('td');

    let observer = (e) => {
        // console.log(e);
        if ([EVENTS.GOOGLE_JUMPED, EVENTS.PLAYER1_MOVED, EVENTS.PLAYER2_MOVED].every(name => name !== e.name)) return;

        if (e.payload.prevPosition.x === x && e.payload.prevPosition.y === y) {
            render(element, x, y, localState);
        }
        if (e.payload.newPosition.x === x && e.payload.newPosition.y === y) {
            render(element, x, y, localState);
        }

    };

    subscribe(observer);

    render(element, x, y, localState)

    return {
        element,
        cleanup: () => {
            // console.log(`Cell cleanup was called ${x}','${y}`);
            unsubscribe(observer);
        }
    };
}

async function render(element, x, y, localState) {
    localState.renderVersion++;
    const currentRenderVersion = localState.renderVersion;

    element.innerHTML = '';

    // console.log(`Cell component render ${x}','${y}`)
    const googlePosition = await getGooglePosition();
    const player1Position = await getPlayerPosition(1);
    const player2Position = await getPlayerPosition(2);

    if(currentRenderVersion < localState.renderVersion) {
        console.log('New version of rendering');
        return;
    }

    if (googlePosition.x === x && googlePosition.y === y) {
        element.append(GoogleComponent().element);
    }
    if (player1Position.x === x && player1Position.y === y) {
        element.append(PlayerComponent(1).element);
    }
    if (player2Position.x === x && player2Position.y === y) {
        element.append(PlayerComponent(2).element);
    }


}