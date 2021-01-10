import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateRecipe, fetchRecipe } from '../actions/index';
import MutableIngdredients from './MutableIngredients';
import {FormErrors} from './FromErrors';

class UpdateRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            title: '',
            instruction: '',
            mealPrepTime: '',
            sourceUrl: '',
            ingredients: [''],
            formErrors: { title: '', mealPrepTime: '' },
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            id: nextProps.recipe.id,
            title: nextProps.recipe.title,
            instruction: nextProps.recipe.instruction,
            mealPrepTime: nextProps.recipe.mealPrepTime,
            sourceUrl: nextProps.recipe.sourceUrl,
            ingredients: nextProps.recipe.ingredients
        });
    }

    componentDidMount = () => {
        if (this.props.match.params.id) {
            this.props.fetchRecipe(this.props.match.params.id);
        }
    }

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
                titleValid = value.length < 30 && value.length > 0;
                fieldValidationErrors.title = titleValid ? '' : ' must be less than 30 characters, cannot be empty';
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

    handleReset = () => {
        this.setState({
            title: '',
            instruction: '',
            mealPrepTime: '',
            sourceUrl: '',
            ingredients: [''],
            redirect: true
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.title.trim() && this.state.instruction.trim()) {
            this.props.onUpdateRecipe(this.state);
            this.handleReset();
        }
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
                        <button type="submit" disabled={!this.state.formValid} className="btn btn-primary">Update recipe</button>
                        <button type="button" className="btn btn-warning" onClick={this.handleReset}>Reset</button>
                    </div>
                </form>
                <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    recipe: state.recipes.recipe
});

export default connect(mapStateToProps, { updateRecipe, fetchRecipe })(UpdateRecipe);
