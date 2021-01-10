import React, { Component } from 'react';

class MutableIngdredients extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredients: props.ingredients,
            ingredient: ''
        };
        this.handleIngredientInputChange = this.handleIngredientInputChange.bind(this);
        this.handleSubmitIngredient = this.handleSubmitIngredient.bind(this);
        this.handleClickIndex = this.handleClickIndex.bind(this)
    }

    handleSubmitIngredient = e => {
        e.preventDefault();
        this.props.ingredients.push(this.state.ingredient);
        this.handleResetIngredient();
    };

    handleIngredientInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleResetIngredient = () => {
        this.setState({
            ingredients: this.state.ingredients,
            ingredient: ''
        });
    };

    handleClickIndex(index, event) {
        eval(this[event.target.name]).bind(this)(index, event)
    }

    removeIngredient(index, event) {
        const ingredients = this.props.ingredients;
        ingredients.splice(index, 1);
        this.setState({
            ingredients: {ingredients},
            ingredient: ''
        });
      }

    render() {
        return <div>
            <h1>List of ingredients</h1>
            <ul>
                {this.props.ingredients.map((item, index) =>
                        <li key={index}>
                            {item}
                            <button name="removeIngredient" type="button" className="btn btn-warning" onClick={event => this.handleClickIndex(index, event)}>x</button>
                        </li>)}
            </ul>
            <div>
                <form onSubmit={this.handleSubmitIngredient}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="ingredient"
                            className="form-control"
                            name="ingredient"
                            onChange={this.handleIngredientInputChange}
                            value={this.state.ingredient}/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Add ingredient</button>
                    </div>
                </form>
            </div>
        </div>
    }
}
export default MutableIngdredients;