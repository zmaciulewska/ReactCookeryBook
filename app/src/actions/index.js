import { ADD_RECIPE, DELETE_RECIPE, FETCH_RECIPES, UPDATE_RECIPE, FETCH_RECIPE} from './types';
import axios from 'axios';

const apiUrl = 'http://localhost:4000/recipes';

export const createRecipe = ({ title, instruction, ingredients, mealPrepTime, sourceUrl }) => {
  return (dispatch) => {
    return axios.post(`${apiUrl}`, {title, instruction, ingredients, mealPrepTime, sourceUrl})
      .then(response => {
        dispatch(createRecipeSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const createRecipeSuccess =  (data) => {
  return {
    type: ADD_RECIPE,
    payload: {
      id: data.id,
      title: data.title,
      instruction: data.instruction,
      mealPrepTime: data.mealPrepTime,
      sourceUrl: data.sourceUrl,
      ingredients: data.ingredients,
    }
  }
};

export const updateRecipe = (recipe) => dispatch => {
  return axios.put(`${apiUrl}/${recipe.id}`, recipe)
    .then(response => dispatch(updateRecipeSuccess(response.data)))
    .then(dispatch(fetchAllRecipes()) )
    .catch(error => {
      throw(error);
    });
}

export const updateRecipeSuccess =  (recipe) => {
  return {
    type: UPDATE_RECIPE,
    payload: recipe
  }
};

export const fetchRecipe = (id) => dispatch => {
  return axios.get(`${apiUrl}/${id}`)
    .then(response => {
      dispatch({
        type: FETCH_RECIPE,
        payload: response.data
      })
    })
    .catch(error => {
      throw(error);
    });
};


export const deleteRecipeSuccess = id => {
  return {
    type: DELETE_RECIPE,
    payload: id
  }
}

export const deleteRecipe = id => {
  return (dispatch) => {
    return axios.delete(`${apiUrl}/${id}`)
      .then(response => {
        dispatch(deleteRecipeSuccess(id))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const fetchRecipes = (recipes) => {
  return {
    type: FETCH_RECIPES,
    recipes
  }
};

export const fetchAllRecipes = () => {
  return (dispatch) => {
    return axios.get(apiUrl)
      .then(response => {
        dispatch(fetchRecipes(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};