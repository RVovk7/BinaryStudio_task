import {
  combineReducers,
} from 'redux';
import types from './types';

const initialState = {
  data: [],
  loading: false,
  error: null,
};
const getRecipe = (state = initialState, action) => {
  const {
    data,
  } = action;
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
        data,
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
const postRecipe = (state = initialState, action) => {
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
  getRecipe,
  postRecipe,
});

export default rootReducer;