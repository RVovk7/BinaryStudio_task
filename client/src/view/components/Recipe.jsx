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
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconEdit from 'svg/edit.svg';
import IconDelete from 'svg/delete.svg';
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
    avatar: {
        backgroundColor: red[500],
    },
});

class Recipe extends Component {
    static propTypes = {
        rList: PropTypes.instanceOf(Object).isRequired,
        classes: PropTypes.instanceOf(Object).isRequired,
        openModal: PropTypes.func.isRequired,
        fromRecipeToModal: PropTypes.func.isRequired,
        deleteRecipe: PropTypes.func.isRequired,
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
        const { rList, deleteRecipe } = this.props;
        deleteRecipe(rList.time);
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };


    render() {
        const { props: { classes, rList }, state: { expanded }, editClick, deleteClick } = this;
        const dateCreate = new Date(rList.dateModify || rList.time).toLocaleString('en');
        return (
            <div className="grid__item--md-span-4">
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            (
                                <Avatar aria-label="Recipe" className={classes.avatar}>
                                    {rList.recipeName[0].toUpperCase()}
                                </Avatar>
                            )
                        }
                        action={
                            (
                                <Tooltip title="all recipe version">
                                    <IconButton>
                                        <MoreVertIcon />
                                    </IconButton>
                                </Tooltip>
                            )
                        }
                        title={rList.recipeName}
                        subheader={dateCreate}
                    />
                    <CardMedia
                        className={classes.media}
                        image="https://www.ihdimages.com/wp-content/uploadsktz/2014/11/delicious_food_wallpaper_free_desktop.jpg"
                        title={rList.recipeName}
                    />
                    <CardContent>
                        <Typography component="p">
                            {rList.recipeDetail.length < 100 ? rList.recipeDetail : `${rList.recipeDetail.slice(0, 100)}...`}
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <Tooltip title="Edit">
                            <IconButton onClick={editClick} variant="fab" aria-label="Edit" className="buttonSize">
                                <img src={IconEdit} alt="icon" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton onClick={deleteClick} color="secondary" aria-label="Delete" className="buttonSize">
                                <img src={IconDelete} alt="icon" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Viev All">
                            <IconButton
                                className={classnames(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                                onClick={this.handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="Show more"
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        </Tooltip>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph variant="body2">
                                {`${rList.recipeDetail.slice(100)}...`}
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(Recipe);
