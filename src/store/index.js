import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import gameState from './gameState';
import leaderboard from './leaderboard';
import position from './position';
import time from './time';

const reducer = combineReducers({
  gameState,
  leaderboard,
  position,
  time,
});
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(reducer, middleware);

export default store;
