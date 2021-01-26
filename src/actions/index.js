import { UPDATE_PLAYERS } from './types';

export const updatePlayers = (players) => {
    return {
        type: UPDATE_PLAYERS,
        payload: players
    }
}