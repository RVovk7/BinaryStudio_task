import React, { Component } from 'react';
import PropTypes from 'prop-types';
// --------------material import----------------
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import IconEdit from 'svg/edit.svg';
import IconDelete from 'svg/delete.svg';
import IconMore from 'svg/more.svg';
import IconArrow from 'svg/down-arrow.svg';
import Tooltip from '@material-ui/core/Tooltip';
// --------------material import----------------

const styles = theme => ({
    card: {
        margin: 15,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },

});

class Recipe extends Component {
    static propTypes = {
        rList: PropTypes.instanceOf(Object).isRequired,
        classes: PropTypes.instanceOf(Object).isRequired,
        openModal: PropTypes.func.isRequired,
        fromRecipeToModal: PropTypes.func.isRequired,
        versionRecipe: PropTypes.func.isRequired,
        deleteRecipe: PropTypes.func.isRequired,
        view: PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
        };
    }

    editClick = () => {
        const { rList, openModal, fromRecipeToModal } = this.props;
        openModal();
        const data = {
            time: rList.time,
            recipeName: rList.recipeName,
            recipeDetail: rList.recipeDetail,
        };
        fromRecipeToModal(data);
    };

    deleteClick = () => {
        const { rList, deleteRecipe, view } = this.props;
        console.log(view);
        if (!view) deleteRecipe(rList.time, view);
        if (view) deleteRecipe(rList.dateModify, view, rList.time);
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };


    render() {
        const { props: { classes, rList, versionRecipe, view }, state: { expanded }, editClick, deleteClick } = this;
        const dateCreate = new Date(rList.dateModify || rList.time).toLocaleString('en');
        return (
            <div className="grid__item--md-span-4">
                <Card className={classes.card}>

                    <CardHeader
                        avatar={
                            (
                                <Avatar aria-label="Recipe" className="recipeAvatar">
                                    {rList.recipeName[0].toUpperCase()}
                                </Avatar>
                            )
                        }
                        action={
                            (!view && (
                                <Tooltip title="all recipe version">
                                    <IconButton onClick={() => versionRecipe(rList.time)} className="buttonSizeV">
                                        <img src={IconMore} alt="icon" />
                                    </IconButton>
                                </Tooltip>)
                            )
                        }
                        title={<p> {rList.recipeName}</p>}
                        subheader={<p> {dateCreate}</p>}
                    />

                    <CardMedia
                        className={classes.media}
                        image="https://www.ihdimages.com/wp-content/uploadsktz/2014/11/delicious_food_wallpaper_free_desktop.jpg"
                        title={rList.recipeName}
                    />

                    <CardContent>
                        <Typography component="p" className="recipeText">
                            {rList.recipeDetail.length < 100 ? rList.recipeDetail : `${rList.recipeDetail.slice(0, 100)}...`}
                        </Typography>
                    </CardContent>

                    <CardActions className={classes.actions} disableActionSpacing>
                        {!view && (
                            <Tooltip title="Edit">
                                <IconButton onClick={editClick} variant="fab" aria-label="Edit" className="buttonSize">
                                    <img src={IconEdit} alt="icon" />
                                </IconButton>
                            </Tooltip>)}
                        <Tooltip title="Delete">
                            <IconButton onClick={deleteClick} color="secondary" aria-label="Delete" className="buttonSize">
                                <img src={IconDelete} alt="icon" />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Viev All">
                            <IconButton
                                id="show"
                                className={classnames(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                                onClick={this.handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="Show more"
                            >
                                <img src={IconArrow} alt="icon" />
                            </IconButton>
                        </Tooltip>
                    </CardActions>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography className="recipeText" paragraph variant="body2">
                                {`${rList.recipeDetail.slice(100)}`}
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(Recipe);
