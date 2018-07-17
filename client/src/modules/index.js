import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import {
  createLogger,
} from 'redux-logger';
import fetchReducer from './fetch';
import localReducer from './local';


const rootReducer = combineReducers({
  ...fetchReducer,
  ...localReducer,
});

const logger = createLogger();
const middleware = applyMiddleware(thunk, logger);

const chatStore = createStore(
  rootReducer,
  compose(
    middleware,
    window.navigator.userAgent.includes('Chrome') ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : compose,
  ),
);

export default chatStore;