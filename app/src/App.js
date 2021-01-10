import React, { Component } from 'react';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CreateRecipe from './containers/CreateRecipe';
import RecipeList from './containers/RecipeList';
import EditRecipe from './containers/EditRecipe';


import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

const stylesApp = {
  marginTop: 40
  
}

class App extends Component {
  render() {
    return (
      <Router>
      <div className="container">
      <Route exact path="/" component={RecipeList} />
      <Route path="/new" component={CreateRecipe} />
      <Route path="/edit/:id" component={EditRecipe} />
      </div>
      </Router>
    );
  }
}

export default App;