import React from 'react';
import { Redirect } from 'react-router-dom';
import MutableIngdredients from './MutableIngredients';
import {FormErrors} from './FromErrors';

class NewRecipe extends React.Component {
  state = {
    title: '',
    instruction: '',
    ingredients: [],
    mealPrepTime: '',
    sourceUrl: '',
    redirect: false,
    formErrors: { title: '', mealPrepTime: '' },
  };

  handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let titleValid = this.state.titleValid;
    let mealPrepTimeValid = this.state.mealPrepTimeValid;

    switch (fieldName) {
      case 'title':
        //titleValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        titleValid = value.length < 20 && value.length>0 ;
        fieldValidationErrors.title = titleValid ? '' : ' must be less than 20 characters, cannot be empty';
        break;
      case 'mealPrepTime':
        mealPrepTimeValid = value > 0;
        fieldValidationErrors.mealPrepTime = mealPrepTimeValid ? '' : ' must be bigger than 0';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      titleValid: titleValid,
      mealPrepTimeValid: mealPrepTimeValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.titleValid && this.state.mealPrepTimeValid });
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.title.trim() && this.state.instruction.trim()) {
      this.props.onAddRecipe(this.state);
      this.handleReset();
    }
  };

  handleReset = () => {
    this.setState({
      title: '',
      instruction: '',
      ingredients: [],
      mealPrepTime: '',
      sourceUrl: '',
      redirect: true
    });
  };

  render() {

    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/' />;
    }

    return (
      <div>
        <MutableIngdredients ingredients={this.state.ingredients} />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Title"
              className="form-control"
              name="title"
              onChange={this.handleInputChange}
              value={this.state.title}
            />
          </div>
          <div className="form-group">
            <textarea
              cols="19"
              rows="8"
              placeholder="Instruction"
              className="form-control"
              name="instruction"
              onChange={this.handleInputChange}
              value={this.state.instruction}>
            </textarea>
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder="Meal preparation time (in minutes)"
              className="form-control"
              name="mealPrepTime"
              onChange={this.handleInputChange}
              value={this.state.mealPrepTime}
            />
          </div>
          <div className="form-group">
            <input
              type="url"
              placeholder="Source URL"
              className="form-control"
              name="sourceUrl"
              onChange={this.handleInputChange}
              value={this.state.sourceUrl}
            />
          </div>
          <div className="form-group">
            <button type="submit" disabled={!this.state.formValid} className="btn btn-primary">Add Recipe</button>
            <button type="button" className="btn btn-warning" onClick={this.handleReset}>
              Reset
            </button>
          </div>

        </form>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>

      </div>
    );
  }
}

export default NewRecipe;