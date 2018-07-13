import React, { Component } from 'react';
import { actions } from 'modules/add';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Recipe from 'components/Recipe';

class RecipeList extends Component {
    static propTypes = {
        getRecipe: PropTypes.func.isRequired,
        RecipeList: PropTypes.instanceOf(Array).isRequired,
    }

    componentDidMount() {
        const { getRecipe } = this.props;
        getRecipe();
    }

    render() {
        // eslint-disable-next-line
        const { RecipeList } = this.props;
        console.log(RecipeList);
     // RecipeList.loading ?
        return (
            <div className="recipeList">
                {RecipeList.map(e => <Recipe RecipeList={e} />)}
            </div>
        );
    }
}
const mapStateToProps = (state = []) => {
    return {
        RecipeList: state.getRecipe,
    };
};
const mapDispatchToProps = dispatch => ({
    getRecipe: () => dispatch(actions.getRecipe()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);
