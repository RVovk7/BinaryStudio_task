import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './add';

const logger = createLogger();
const middleware = applyMiddleware(thunk, logger);

const chatStore = createStore(
  rootReducer,
  compose(
    middleware,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

export default chatStore;