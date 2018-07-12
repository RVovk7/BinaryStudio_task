import { combineReducers } from 'redux';
import types from './types';

const initialState = {
  data: [],
  loading: false,
  error: null,
};
const addRecipe = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case types.FETCH_BEGIN:
    return {
      ...state,
      loading: true,
      error: null,
      data: [],
    };

  case types.FETCH_SUCCESS:
    return {
      ...state,
      loading: false,
      data: action,
    };

  case types.FETCH_ERROR:
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      data: [],
    };

  default:
    return state;
  }
};
export const rootReducer = combineReducers({
  addRecipe,
});

export default rootReducer;
