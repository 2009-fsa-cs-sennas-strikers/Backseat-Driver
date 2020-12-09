//do we need this?
import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_LEADERBOARD = 'GET_LEADERBOARD';
const ADD_TO_LEADERBOARD = 'ADD_TO_LEADERBOARD';

/**
 * INITIAL STATE
 */
const INITIAL_STATE = [];

/**
 * ACTION CREATORS
 */
const getLeaderboard = (leaderboard) => ({
  type: GET_LEADERBOARD,
  leaderboard,
});

const addToLeaderboard = (newRecord) => ({
  type: ADD_TO_LEADERBOARD,
  newRecord,
});

/**
 * THUNK CREATORS
 */
export const fetchLeaderboardFromDBb = () => async (dispatch) => {
  //do we need axios and routes? or can we access firestore db directly?
  try {
  const { data } = await axios.get(`/api/leaderboard/`);
  dispatch(getLeaderboard(data));
  } catch (error) {
    console.log(error)
  }
};

export const addRecordToDb = (newRecord) => async (dispatch) => {
  try {
    //do we need axios and routes? or can we access firestore db directly?
    const { data } = await axios.post(`/api/leaderboard`, newRecord);
    dispatch(addToLeaderboard(data));
  } catch (error) {
    console.log(error);
  }
};

/**
 * REDUCER
 */
export default function leaderboardReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_LEADERBOARD:
      return action.leaderboard;
    case ADD_TO_LEADERBOARD:
      return [...state, action.newRecord];
    default:
      return state;
  }
}
