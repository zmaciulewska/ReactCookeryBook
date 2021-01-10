import { connect } from 'react-redux';
import { createRecipe } from '../actions';
import NewRecipe from '../components/NewRecipe';

const mapDispatchToProps = dispatch => {
  return {
    onAddRecipe: recipe => {
      dispatch(createRecipe(recipe));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NewRecipe);