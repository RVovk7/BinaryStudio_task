import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionsFetch } from 'modules/fetch';
import { actionsLocal } from 'modules/local';
import Recipe from 'components/Recipe';
import Spinner from 'svg/spinner.svg';
import Header from 'components/Header';
import Button from '@material-ui/core/Button';

class RecipeList extends Component {
    static propTypes = {
        getRecipe: PropTypes.func.isRequired,
        deleteRecipe: PropTypes.func.isRequired,
        openModal: PropTypes.func.isRequired,
        openAdd: PropTypes.func.isRequired,
        versionRecipe: PropTypes.func.isRequired,
        fromRecipeToModal: PropTypes.func.isRequired,
        Recipes: PropTypes.instanceOf(Object).isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            view: false,
        };
    }


    componentDidMount() {
        const { getRecipe } = this.props;
        getRecipe();
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            view: nextProps.Recipes.view,
        };
    }

    render() {
        const { props: { Recipes, openModal, openAdd, fromRecipeToModal, deleteRecipe, versionRecipe, getRecipe }, state: { view } } = this;
        if (!Recipes.loading) {
            Recipes.data.sort((a, b) => b.dateModify - a.dateModify);
            return (
                <Fragment>
                    <Header view={view} getRecipe={getRecipe} />
                    {!Recipes.data.length && (
                        <div style={{ justifyContent: 'center' }} className="spinner">
                            <h1>No One Recipe</h1>
                        </div>
                    )
                    }
                    <div className="grid">
                        {Recipes.data.map((e) => (
                            <Recipe
                                key={e.dateModify}
                                rList={e}
                                openModal={openModal}
                                view={view}
                                fromRecipeToModal={fromRecipeToModal}
                                versionRecipe={versionRecipe}
                                deleteRecipe={deleteRecipe} />))}
                    </div>
                    <div className="addButton">
                        <Button className="buttonSizeAdd" variant="fab" color="primary" aria-label="add" onClick={openAdd}>
                            +
                        </Button>
                    </div>
                </Fragment>
            );
        }
        return (
            <div className="spinner">
                <div className="shead">
                    <h1>CookBook</h1>
                </div>
                <img src={Spinner} alt="icon" />
            </div>
        );
    }
}
const mapStateToProps = (state = []) => {
    console.log(state);
    return {
        Recipes: state.getRecipe,
    };
};
const mapDispatchToProps = dispatch => ({
    getRecipe: () => dispatch(actionsFetch.getRecipe()),
    deleteRecipe: (data, view, time) => dispatch(actionsFetch.deleteRecipe(data, view, time)),
    versionRecipe: data => dispatch(actionsFetch.versionRecipe(data)),
    fromRecipeToModal: data => dispatch(actionsLocal.fromRecipeToModal(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);
