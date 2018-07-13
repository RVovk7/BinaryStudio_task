import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Recipe extends Component {
    static propTypes = {
        RecipeList: PropTypes.instanceOf(Object).isRequired,
    }

    render() {
        const { RecipeList } = this.props;
        return (
            <div>
                <div> {RecipeList.time}</div>
                <div> {RecipeList.name}</div>
                <div> {RecipeList.detail}</div>
            </div>
        );
    }
}
