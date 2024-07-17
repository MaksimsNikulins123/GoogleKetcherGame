import { MOVING_DERECTIONS } from "../../../core/constans.js";
import {
    getGridSize,
    movePlayer,
    // subscribe,
    // unsubscribe
} from "../../../core/state-manger.proxy.js";
import {
    CellComponent
} from "./CellComponent/Cell.component.js";

export function GridComponent() {
    // debugger
    // console.log('Grid component created')

    const localState = {
        cleanupFunctions: []
    }

    const keyUpObserver = (e) => {
        // console.log(e.code)
        switch (e.code) {
            case 'ArrowUp': movePlayer(1, MOVING_DERECTIONS.UP); break;
            case 'ArrowDown': movePlayer(1, MOVING_DERECTIONS.DOWN); break;
            case 'ArrowLeft': movePlayer(1, MOVING_DERECTIONS.LEFT); break;
            case 'ArrowRight': movePlayer(1, MOVING_DERECTIONS.RIGHT); break;

            case 'KeyW': movePlayer(2, MOVING_DERECTIONS.UP); break;
            case 'KeyS': movePlayer(2, MOVING_DERECTIONS.DOWN); break;
            case 'KeyA': movePlayer(2, MOVING_DERECTIONS.LEFT); break;
            case 'KeyD': movePlayer(2, MOVING_DERECTIONS.RIGHT); break;
        }
    };

    document.addEventListener('keyup', keyUpObserver);

    const element = document.createElement('div');
    element.classList.add('grid');

    // const observer = () => {
    //     render(element);
    // };

    // subscribe(observer);

    render(element, localState);

    return {
        element,
        cleanup: () => {
            // console.log('Grid cleanup was called');
            localState.cleanupFunctions.forEach(cleanupFunction => cleanupFunction())
            // unsubscribe(observer);
            document.removeEventListener('keyup', keyUpObserver)
        }
    };
}

async function render(element, localState) {
    // console.log('Grid component render');
    localState.cleanupFunctions.forEach(cleanupFunction => cleanupFunction());
    localState.cleanupFunctions = [];
    element.innerHTML = '';   
    const gridSizePromise = getGridSize();
    const gridSize = await gridSizePromise;

    for (let y = 0; y < gridSize.rowsCount; y++) {
        const rowElement = document.createElement('tr');

        for (let x = 0; x < gridSize.columnsCount; x++) {
            const cellComponent = CellComponent(x, y);
            localState.cleanupFunctions.push(cellComponent.cleanup)
            rowElement.append(cellComponent.element);
        }

        element.append(rowElement);
    }
    // console.log('GRID RENDERED =================================');
}