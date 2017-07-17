import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

// Import reducers
import preferenceReducer from '../reducers/preferenceReducer';
import userReducer from '../reducers/userReducer';
import roomReducer from '../reducers/roomReducer';
import fetchingReducer from '../reducers/fetchingReducer';
import renderReducer from '../reducers/renderReducer';


export const initStore = () => {

  const reducer = combineReducers({
    preferences: preferenceReducer,
    user: userReducer,
    rooms: roomReducer,
    isFetching: fetchingReducer,
    renderWait: renderReducer
  });

  const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
}
