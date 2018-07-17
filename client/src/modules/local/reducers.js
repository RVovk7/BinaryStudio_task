import types from './types';

const initialState = {
    data: [],
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

export const localReducer = {
    editRecipe,
};
export default localReducer;