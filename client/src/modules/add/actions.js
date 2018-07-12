import types from './types';

export const fetchBegin = () => ({
  type: types.FETCH_BEGIN,
});

export const fetchSuccess = products => ({
  type: types.FETCH_SUCCESS,
  payload: { products },
});

export const fetchError = error => ({
  type: types.FETCH_FAILURE,
  payload: { error },
});
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export function addRecipe(recipeData) {
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
        dispatch(fetchSuccess(json.products));
        return json.products;
      })
      .catch(error => dispatch(fetchFailure(error)));
  };
}

export default {
addRecipe,
};
