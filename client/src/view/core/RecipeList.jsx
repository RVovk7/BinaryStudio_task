import React, { Component } from 'react';
import { actions } from 'modules/add';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Recipe from 'components/Recipe';

class RecipeList extends Component {
    static propTypes = {
        getRecipe: PropTypes.func.isRequired,
        deleteRecipe: PropTypes.func.isRequired,
        openModal: PropTypes.func.isRequired,
        fromRecipeToModal: PropTypes.func.isRequired,
        Recipes: PropTypes.instanceOf(Object).isRequired,
    }

    componentDidMount() {
        const { getRecipe } = this.props;
        getRecipe();
    }

    render() {
        const { Recipes, openModal, fromRecipeToModal, deleteRecipe } = this.props;
        if (!Recipes.loading) {
            console.log('Recipes.data', Recipes.data);
            return (
                <div className="grid">
                    {Recipes.data.map(e => (
                        <Recipe
                            key={e.time}
                            rList={e}
                            openModal={openModal}
                            fromRecipeToModal={fromRecipeToModal}
                            deleteRecipe={deleteRecipe} />))}
                </div>
            );
        }
        return (
            <div className="recipeList">
                Loading...
            </div>
        );
    }
}
const mapStateToProps = (state = []) => {
    return {
        Recipes: state.getRecipe,
    };
};
const mapDispatchToProps = dispatch => ({
    getRecipe: () => dispatch(actions.getRecipe()),
    deleteRecipe: data => dispatch(actions.deleteRecipe(data)),
    fromRecipeToModal: data => dispatch(actions.fromRecipeToModal(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);
