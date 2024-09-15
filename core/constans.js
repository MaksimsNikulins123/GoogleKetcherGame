export const GAME_STATUSES = {
    SETTINGS: 'settings',
    IN_PROGRESS: 'in_progress',
    WIN: 'win',
    LOSE: 'lose',
}

export const SOUND_STATUSES = {
    OFF: 'false',
    ON: 'true',
}

export const EVENTS = {
    GOOGLE_JUMPED: 'GOOGLE_JUMPED',
    PLAYER1_MOVED: 'PLAYER1_MOVED',
    PLAYER2_MOVED: 'PLYER2_MOVED',
    STATUS_CHANGED: 'STATUS_CHANGED',
    SCORES_CHANGED: 'SCORES_CHENGED',
    GOOGLE_COUGHT: 'GOOGLE_COUGHT',
    GOOGLE_RUN_AWAY: 'GOOGLE_RUN_AWAY',
    SOUND_STATUS_CHANGED: 'SOUND_STATUS_CHANGED',
}

export const MOVING_DERECTIONS = {
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right',
}

export const GRID_SIZE_BUTTON_VALUE = {
    title: 'Select grid size',
    payload: ['5:5', '10:10', '15:15', '20:20', '25:25', '30:30']
}