import React from 'react';
import { Link } from 'react-router-dom';
import IngredientsList from './IngredientsList';

const styles = {
  borderBottom: '2px solid #eee',
  background: '#DABF88',
  margin: '.75rem auto',
  padding: '.6rem 1rem',
  maxWidth: '500px',
  borderRadius: '7px'
};

export default ({ recipe: { title, instruction, id, ingredients, mealPrepTime, sourceUrl }, onDelete }) => {
 return (
    <div  class="col-md-4 text-left" style={ styles }>
      <h2>{ title }</h2>
      <p>Meal prep time: { mealPrepTime }</p>
      <a href={sourceUrl} style={{ color: '#0D4343' }}>Check original recipe</a>
      <p>Ingredients:</p>
      <IngredientsList items={ ingredients } />
      <p>{ instruction }</p>
      <button className="btn btn-danger" type="button" onClick={() => onDelete(id)}>
        Remove
      </button>
      <Link className="btn btn-primary float-right" to={"/edit/" + id}>Edit</Link>
    </div>
  );
};