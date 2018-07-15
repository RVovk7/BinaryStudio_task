import {
  combineReducers,
} from '../../../../../../Library/Caches/typescript/2.9/node_modules/redux';
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

const editRecipe = (state = initialState, action) => {
  const {
    data,
    type,
  } = action;
  switch (type) {
    case types.EDIT_RECIPE:
      return {
        ...state,
        data,
      };
    default:
      return {
        ...state,
      };
  }
};

export const rootReducer = combineReducers({
  getRecipe,
  editRecipe,
});

export default rootReducer;