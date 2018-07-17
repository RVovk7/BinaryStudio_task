import types from './types';

const initialState = {
  data: [],
  loading: false,
  error: null,
  view: false,
};
const getRecipe = (state = initialState, action) => {
  console.log('im run');
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
        data: data.data,
        view: data.view ? data.view : false,
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

export const fetchReducer = {
  getRecipe,
};

export default fetchReducer;