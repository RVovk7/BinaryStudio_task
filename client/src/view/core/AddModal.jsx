import React, { Component } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line
import { actions, addSelectors } from 'modules/add';
import { connect } from 'react-redux';
// --------------material import----------------
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import SaveIcon from '@material-ui/icons/Save';
// --------------material import----------------
function Transition(props) {
    return <Slide direction="left" {...props} />;
}
class AddModal extends Component {
    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        isEdit: PropTypes.bool.isRequired,
        closeModal: PropTypes.func.isRequired,
        postRecipe: PropTypes.func.isRequired,
        editData: PropTypes.instanceOf(Object).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isEdit: false,
            recipeName: '',
            recipeDetail: '',
        };
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            isOpen: nextProps.isOpen,
            isEdit: nextProps.isEdit,
        };
    }

    addRecipe = () => {
        const { state: { recipeName, recipeDetail, isEdit }, props: { postRecipe, editData } } = this;
        if (!isEdit) {
            const data = {
                time: Date.now(),
                dateModify: Date.now(),
                recipeName,
                recipeDetail,
            };
            postRecipe(data);
        }
        if (isEdit) {
            const data = {
                time: editData.data.time,
                dateModify: Date.now(),
                recipeName,
                recipeDetail,
            };
            postRecipe(data);
        }
        this.setState({
            recipeName: '',
            recipeDetail: '',
        });
    }

    render() {
        const { addRecipe, props: { closeModal, editData }, state: { recipeName, recipeDetail, isOpen } } = this;
        console.log(editData);
        return (
            <div>
                <Dialog
                    fullScreen
                    open={isOpen}
                    onClose={closeModal}
                    TransitionComponent={Transition}
                >
                    <AppBar>
                        <Toolbar>
                            <IconButton color="inherit" onClick={closeModal} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit">
                                Add your recipe
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <form onSubmit={e => e.preventDefault()} className="addForm">
                        <DialogContent>
                            <TextField
                                label="recipe name"
                                placeholder="Please enter recipe name"
                                multiline
                                margin="normal"
                                onChange={e => this.setState({ recipeName: e.target.value })}
                                value={recipeName}
                            />
                            <TextField
                                label="recipe detail"
                                placeholder="Please enter recipe detail"
                                multiline
                                fullWidth
                                margin="normal"
                                onChange={e => this.setState({ recipeDetail: e.target.value })}
                                value={recipeDetail}
                            />
                        </DialogContent>
                    </form>
                    <div className="addButton">
                        <Button
                            variant="fab"
                            color="primary"
                            aria-label="add"
                            onClick={() => {
                                closeModal();
                                addRecipe();
                            }}>
                            <SaveIcon />
                        </Button>
                    </div>
                </Dialog>

            </div>
        );
    }
}
const mapStateToProps = (state = []) => {
    return {
        editData: state.editRecipe,
    };
};
const mapDispatchToProps = dispatch => ({
    postRecipe: data => dispatch(actions.postRecipe(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddModal);
