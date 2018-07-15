import React, { Component } from 'react';
import { actions } from 'modules/add';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Recipe from 'components/Recipe';

class RecipeList extends Component {
    static propTypes = {
        getRecipe: PropTypes.func.isRequired,
        openModal: PropTypes.func.isRequired,
        Recipes: PropTypes.instanceOf(Object).isRequired,
    }

    componentDidMount() {
        const { getRecipe } = this.props;
        getRecipe();
    }

    componentWillReceiveProps() {
        console.log('i recive props');
    }

    render() {
        const { Recipes, openModal } = this.props;
        if (!Recipes.loading) {
            console.log('Recipes.data', Recipes.data);
            return (
                <div className="recipeList">
                    {Recipes.data.map(e => <Recipe key={e.time} rList={e} openModal={openModal} />)}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);
