import { ADD_RECIPE, DELETE_RECIPE, FETCH_RECIPES, UPDATE_RECIPE, FETCH_RECIPE } from '../actions/types';

export default function recipeReducer(state = [], action) {
    switch (action.type) {
        case ADD_RECIPE:
            return [...state, action.payload];
        case DELETE_RECIPE:
            return state.filter(recipe => recipe.id !== action.payload);
        case FETCH_RECIPES:
            return action.recipes;
        case UPDATE_RECIPE:
            return [ action.payload, ...state];
        case FETCH_RECIPE:
            return {
                ...state,
                recipe: action.payload
            }
        default:
            return state;
    }
}