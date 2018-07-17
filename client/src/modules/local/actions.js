import types from './types';

export const fromRecipeToModal = data => ({
    type: types.EDIT_RECIPE,
    data,
});

export default {
    fromRecipeToModal,
};