import firebase from '../firebase';

// Inititializing firebase database
// Saving reference to leaderboard table
const db = firebase.firestore();
const leaderboardRef = db.collection('leaderboard')

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
export const fetchLeaderboardFromDb = () => async (dispatch) => {
  try {
    const leaderboard = await leaderboardRef.orderBy('score', 'desc').limit(10).get();
    dispatch(getLeaderboard(leaderboard));
  } catch (error) {
    console.log(error)
  }
};

export const addRecordToDb = (newRecord) => async (dispatch) => {
  try {
    const newScore = await leaderboardRef.doc(newRecord.name).set(newRecord);
    // newRecord may not be in order
    // sort score if not in order
    // may not need to dispatch, could just fetch all
    // scores on separate screen
    dispatch(addToLeaderboard(newScore));
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
