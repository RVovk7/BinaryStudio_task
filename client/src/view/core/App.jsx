import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postRecipes } from 'modules/fetch';
import RecipeList from 'core/RecipeList';
import AddModal from 'components/AddModal';
import 'style/main.scss';

class App extends Component {
  static propTypes = {
    postRecipe: PropTypes.func.isRequired,
    editData: PropTypes.instanceOf(Object).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      edit: false,
    };
  }

  closeModal = () => {
    this.setState({
      open: false,
    });
  }

  openModal = () => {
    this.setState({
      open: true,
      edit: true,
    });
  }

  openAdd = () => {
    this.setState({
      open: true,
      edit: false,
    });
  }

  render() {
    const { state: { open, edit }, props: { editData, postRecipe } } = this;
    return (
      <div>
        <div className="main_container">
          <div className="recipe_container">
            <RecipeList openModal={this.openModal} openAdd={this.openAdd} />
          </div>
          <AddModal
            isOpen={open}
            isEdit={edit}
            closeModal={this.closeModal}
            editData={editData}
            postRecipe={postRecipe}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state = []) => {
  return {
    editData: state.localReducer.data,
  };
};
const mapDispatchToProps = dispatch => ({
  postRecipe: data => dispatch(postRecipes(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
