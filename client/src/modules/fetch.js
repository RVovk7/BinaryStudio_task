const FETCH_BEGIN = 'FETCH_RECIPE_BEGIN';
const FETCH_ERROR = 'FETCH_RECIPE_ERROR';
const FETCH_SUCCESS = 'FETCH_RECIPE_SUCCESS';

const initialState = {
  data: [],
  loading: false,
  error: null,
  view: false,
};

export default function fetchReducer(state = initialState, action) {
  const {
    data,
  } = action;
  switch (action.type) {
    case FETCH_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        data: [],
      };

    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: data.data,
        view: data.view,
      };

    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: [],
      };

    default:
      return state;
  }
}

// used by all actions
export const fetchBegin = () => ({ type: FETCH_BEGIN });
export const fetchSuccess = data => ({ type: FETCH_SUCCESS, data });
export const fetchError = error => ({ type: FETCH_ERROR, payload: { error } });

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}


export function postRecipes(recipeData) {
  return dispatch => {
    dispatch(fetchBegin());
    return fetch('http://localhost:3000/api/addRecipe', {
        method: 'POST',
        body: JSON.stringify(recipeData),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchSuccess(json));
      })
      .catch(error => dispatch(fetchError(error)));
  };
}

export function getRecipes() {
  return dispatch => {
    dispatch(fetchBegin());
    return fetch('http://localhost:3000/api/getRecipe')
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchSuccess(json));
      })
      .catch(error => dispatch(fetchError(error)));
  };
}
export function versionRecipes(data) {
  return dispatch => {
    dispatch(fetchBegin());
    return fetch('http://localhost:3000/api/versionRecipe', {
        method: 'POST',
        body: JSON.stringify({
          data,
        }),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchSuccess(json));
      })
      .catch(error => dispatch(fetchError(error)));
  };
}

export function deleteRecipes(data, view, time) {
  return dispatch => {
    dispatch(fetchBegin());
    return fetch('http://localhost:3000/api/deleteRecipe', {
        method: 'POST',
        body: JSON.stringify({
          data,
          view,
          time,
        }),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchSuccess(json));
      })
      .catch(error => dispatch(fetchError(error)));
  };
}