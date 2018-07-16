import types from './types';

export const fetchBegin = () => ({
  type: types.FETCH_BEGIN,
});

export const fetchSuccess = data => ({
  type: types.FETCH_SUCCESS,
  data,
});

export const fetchError = error => ({
  type: types.FETCH_ERROR,
  payload: {
    error,
  },
});

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export function postRecipe(recipeData) {
  return dispatch => {
    dispatch(fetchBegin());
    return fetch('http://172.20.10.2:3000/api/addRecipe', {
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
      .catch(error => dispatch(fetchFailure(error)));
  };
}

export function getRecipe() {
  return dispatch => {
    dispatch(fetchBegin());
    return fetch('http://172.20.10.2:3000/api/getRecipe')
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
          dispatch(fetchSuccess(json));
      })
      .catch(error => dispatch(fetchError(error)));
  };
}

export function deleteRecipe(data) {
  return dispatch => {
    dispatch(fetchBegin());
    return fetch('http://172.20.10.2:3000/api/deleteRecipe', {
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

export const fromRecipeToModal = data => ({
  type: types.EDIT_RECIPE,
  data,
});

export default {
  postRecipe,
  getRecipe,
  deleteRecipe,
  fromRecipeToModal,
};