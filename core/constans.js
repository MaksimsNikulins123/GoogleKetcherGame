export const GAME_STATUSES = {
    SETTINGS: 'settings',
    IN_PROGRESS: 'in_progress',
    WIN: 'win',
    LOSE: 'lose',
}



export const EVENTS = {
    GOOGLE_JUMPED: 'GOOGLE_JUMPED',
    PLAYER1_MOVED: 'PLAYER1_MOVED',
    PLAYER2_MOVED: 'PLYER2_MOVED',
    GAME_STATUS_CHANGED: 'GAME_STATUS_CHANGED',
    SCORES_CHANGED: 'SCORES_CHENGED',
    GOOGLE_COUGHT: 'GOOGLE_COUGHT',
    GOOGLE_RUN_AWAY: 'GOOGLE_RUN_AWAY',
    GRID_SIZE_CHANGED: 'GRID_SIZE_CHANGED',
    POINTS_TO_WIN_CHANGED: 'POINTS_TO_WIN_CHANGED',
    POINTS_TO_LOSE_CHANGED: 'POINTS_TO_LOSE_CHANGED',
    SOUND_STATUS_CHANGED: 'SOUND_STATUS_CHANGED',
    // START_BUTTON_STATUS_CHANGED: 'START_BUTTON_STATUS_CHANGED',
    SAVE_GRID_SIZE_SETTINGS_VALUE: 'SAVE_GRID_SIZE_SETTINGS_VALUE',
    SAVE_POINTS_TO_WIN_SETTINGS_VALUE: 'SAVE_POINTS_TO_WIN_SETTINGS_VALUE',
    SAVE_POINTS_TO_LOSE_SETTINGS_VALUE: 'SAVE_POINTS_TO_LOSE_SETTINGS_VALUE',
    SAVE_SOUND_STATUS: 'SAVE_SOUND_STATUS',
    NEW_SETTINGS_VALUE_SAVED: 'NEW_SETTINGS_VALUE_SAVED',
}

export const MOVING_DERECTIONS = {
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right',
}

export const GRID_SIZE_BLOCK_VALUES = {
    title: 'Grid size',
    button: {
        active: 'true',
        title: 'Select grid size',
        payload: ['5:5', '10:10', '15:15', '20:20', '25:25', '30:30']
    }
   
}
export const POINST_TO_WIN_BLOCK_VALUES = {
    title: 'Points to win',
    button: {
        active: 'true',
        title: 'Select points to win',
        payload: [10, 20, 30, 40, 50]
    }
   
}
export const POINST_TO_LOSE_BLOCK_VALUES = {
    title: 'Points to lose',
    button: {
        active: 'true',
        title: 'Select points to lose',
        payload: [10, 20, 30, 40, 50]
    }
}
export const SOUND_STATUS = {
    off: 'false',
    on: 'true',
}
export const START_BUTTON_STATUS = {
    disable: 'true',
    enable: 'false',
}