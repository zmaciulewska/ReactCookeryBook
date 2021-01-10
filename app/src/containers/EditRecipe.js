import { connect } from 'react-redux';
import { updateRecipe } from '../actions';
import UpdateRecipe from '../components/UpdateRecipe';

const mapDispatchToProps = dispatch => {
  return {
    onUpdateRecipe: recipe => {
      dispatch(updateRecipe(recipe));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(UpdateRecipe);