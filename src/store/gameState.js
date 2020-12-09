import { calcPosFromAngles } from "@react-three/drei";

/**
 * ACTION TYPES
 */
const GET_GAMESTATE = 'GET_GAMESTATE';
const UPDATE_GAMESTATE = 'UPDATE_GAMESTATE';
const RESET_GAMESTATE = 'RESET_GAMESTATE';

/**
 * INITIAL STATE
 */

//calculate randomized start/endzone (could be two separate arrays with different combinations)
//eg, if endzone A, then start is A, if enzone B, then start is B.
const INITIAL_STATE = { isPlaying: false, isPaused: false, courseCompleted: false };

/**
 * ACTION CREATORS
 */

export const getGameState = () => ({
  type: GET_GAMESTATE,
});

export const updateGameState = (gameState) => ({
  type: UPDATE_GAMESTATE,
  gameState,
});

export const resetGameState = () => ({
  type: RESET_GAMESTATE,
});

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function gameStateReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_GAMESTATE:
      return state;
      case UPDATE_GAMESTATE:
        return action.gameState;
    case RESET_GAMESTATE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
