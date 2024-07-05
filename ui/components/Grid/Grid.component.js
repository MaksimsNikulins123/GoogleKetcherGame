import {
    getGridSize,
    subscribe,
    unsubscribe
} from "../../../core/state-manger.js";
import {
    CellComponent
} from "./CellComponent/Cell.component.js";

export function GridComponent() {
    // debugger
    console.log('Grid component created')
    const element = document.createElement('div');
    element.classList.add('grid');

    const observer = () => {
        render(element);
    };

    subscribe(observer);

    render(element);

    return {
        element,
        cleanup: () => {
            console.log('Grid cleanup was called');
            unsubscribe(observer);
        }
    };
}

async function render(element) {
    element.innerHTML = '',
        console.log('Grid component render');
    const gridSizePromise = getGridSize();
    const gridSize = await gridSizePromise;

    for (let y = 0; y < gridSize.rowsCount; y++) {
        const rowElement = document.createElement('tr');

        for (let x = 0; x < gridSize.columnsCount; x++) {
            const cellComponent = CellComponent(x, y);

            rowElement.append(cellComponent.element);
        }

        element.append(rowElement);
    }
}