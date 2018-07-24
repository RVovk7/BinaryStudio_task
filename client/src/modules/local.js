const EDIT_RECIPE = 'EDIT_RECIPE';

const initialState = {
    data: [],
};

export default function localReducer(state = initialState, action) {
    const {
        data,
        type,
    } = action;
    switch (type) {
        case EDIT_RECIPE:
            return {
                ...state,
                data,
            };
        default:
            return {
                ...state,
            };
    }
}

export const fromRecipeToModals = data => ({
    type: EDIT_RECIPE,
    data,
});