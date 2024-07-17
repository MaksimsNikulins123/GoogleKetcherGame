import {
    EVENTS
} from "../../../core/constans.js";
import {
    subscribe
} from "../../../core/state-manger.proxy.js";

export function AudioComponent() {
    
    const catchAudio = new Audio('assets/sounds/catch.wav');
    const missAudio = new Audio('assets/sounds/miss.mp3');

    subscribe((e) => {
        if (e.name === EVENTS.GOOGLE_RUN_AWAY) {
            console.log('Play Google run away');
            missAudio.currentTime = 0;
            missAudio.play();
        }
        if (e.name === EVENTS.GOOGLE_COUGHT) {
            console.log('Play Google cought');
            catchAudio.currentTime = 0;
            catchAudio.play();
           
        }
    })


}