import { GooglePointsComponent } from "./PointsComponent/GooglePoints.component.js";
import { Player1PointsComponent } from "./PointsComponent/Player1Points.component.js";
import { Player2PointsComponent } from "./PointsComponent/Player2Points.component.js";


export function ResultPanelComponent() {
    // console.log("ResultPanelComponent created")
    const element = document.createElement('div');

    element.classList.add('result-panel');

    render(element);

    return {
        element,
        cleanup: () => {}
    };
}

async function render(element) {
    // console.log("ResultPanelComponent render")

    element.innerHTML = '';

    const player1PointsComponent = Player1PointsComponent();
    const player2PointsComponent = Player2PointsComponent();
    const googlePointsComponent = GooglePointsComponent();
   
    element.append(player1PointsComponent.element, player2PointsComponent.element, googlePointsComponent.element)
}