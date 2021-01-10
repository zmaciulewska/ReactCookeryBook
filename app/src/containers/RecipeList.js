import React from 'react';
import { connect } from 'react-redux';
import Recipe from '../components/Recipe';
import { deleteRecipe } from '../actions';
import { Link } from 'react-router-dom'


function RecipeList({ recipes, onDelete }) {

  if(!recipes.length) {
    return (
      <div class="text-center">
      <h3>There is no recipes :(</h3>
      <button className="btn btn-danger" >
        <Link to='/new' style={{ color: '#FFF' }} >Recipe book is empty now, let's start culinary adventure!</Link>
      </button>
      </div>
    )
  }
  return (
    <div  class="text-center">
      
    <button className="btn btn-danger"><Link style={{ color: '#FFF' }} to='/new'>Add new recipe</Link></button>
      {recipes.map(recipe => {
        return (
          <Recipe recipe={ recipe } onDelete={ onDelete } key={ recipe.id } />
        );
      })}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    recipes: state.recipes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDelete: id => {
      dispatch(deleteRecipe(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeList);