import React from 'react';

const IngredientsList = props => (
  <ul>
    {
      props.items.map((item, index) => <li key={index}>{item}</li>)
    }
  </ul>
);

export default IngredientsList;
