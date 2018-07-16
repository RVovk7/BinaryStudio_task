import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import IconBack from 'svg/back.svg';

function Header({ view, getRecipe }) {
    return (
        <header>
            {view && (
            <IconButton className="backButton" color="inherit" onClick={getRecipe}>
                <img src={IconBack} alt="icon" />
            </IconButton>)
            }
            <div className="headText">
                <h3>CookBook</h3>
            </div>
        </header>
    );
}

Header.propTypes = {
    view: PropTypes.bool.isRequired,
    getRecipe: PropTypes.func.isRequired,
};

export default Header;
