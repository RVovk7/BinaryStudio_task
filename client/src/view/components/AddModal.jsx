import React, { Component } from 'react';
import PropTypes from 'prop-types';
// --------------material import----------------
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import IconBack from 'svg/backWhite.svg';
import Slide from '@material-ui/core/Slide';
import IconSave from 'svg/save.svg';
import SnackbarContent from '@material-ui/core/SnackbarContent';
// --------------material import----------------
function Transition(props) {
    return <Slide direction="down" {...props} />;
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

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!prevState.recipeName && nextProps.isEdit) {
            return {
                isOpen: nextProps.isOpen,
                isEdit: nextProps.isEdit,
                recipeName: nextProps.editData.recipeName,
                recipeDetail: nextProps.editData.recipeDetail,
            };
        }
        if (prevState.isEdit && !nextProps.isEdit) {
            return {
                isOpen: nextProps.isOpen,
                isEdit: nextProps.isEdit,
                recipeName: '',
                recipeDetail: '',
            };
        }

   return {
       isOpen: nextProps.isOpen,
    isEdit: nextProps.isEdit,
   };
    }


    addRecipe = () => {
        const { state: { recipeName, recipeDetail, isEdit }, props: { postRecipe, editData, closeModal } } = this;
      if (recipeName.trim()) {
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
                time: editData.time,
                dateModify: Date.now(),
                recipeName,
                recipeDetail,
            };
            postRecipe(data);
        }
        closeModal();
        this.setState({
            recipeName: '',
            recipeDetail: '',
        });
    } else {
        this.Status.style.visibility = 'visible';
        setTimeout(() => {
            this.Status.style.visibility = 'hidden';
        }, 1000);
    }
    }

    close = () => {
     const { closeModal } = this.props;
     this.setState({
        recipeName: '',
        recipeDetail: '',
    });
    closeModal();
    }

    render() {
        const { addRecipe, close, props: { closeModal }, state: { recipeName, recipeDetail, isOpen } } = this;
        return (
            <div>
                <Dialog
                    fullScreen
                    open={isOpen}
                    onClose={closeModal}
                    TransitionComponent={Transition}
                >
                    <AppBar>
                        <Toolbar className="modalBar">
                        <IconButton onClick={close} color="inherit" className="closeButton">
                                <img src={IconBack} alt="icon" />
                        </IconButton>
                           <p>  Add your recipe</p>
                        </Toolbar>
                    </AppBar>
                        <DialogContent className="modalContent">
                            <TextField
                                label="recipe name"
                                placeholder="Please enter recipe name"
                                multiline
                                margin="normal"
                                onChange={e => this.setState({ recipeName: e.target.value })}
                                value={recipeName}
                                className="modalInput"
                            />
                            <TextField
                                label="recipe detail"
                                placeholder="Please enter recipe detail"
                                multiline
                                margin="normal"
                                onChange={e => this.setState({ recipeDetail: e.target.value })}
                                value={recipeDetail}
                                className="modalInput"
                            />
                        </DialogContent>
                        <div ref={e => this.Status = e} className="snackbarContent">
                        <SnackbarContent style={{ color: 'red' }} message="Please enter recipe data!" />
                        </div>

                    <div className="addButton">
                        <Button
                            className="buttonSizeAdd"
                            variant="fab"
                            color="primary"
                            aria-label="add"
                            onClick={addRecipe}
                        >
                           <img src={IconSave} alt="icon" />
                        </Button>
                    </div>
                </Dialog>

            </div>
        );
    }
}
export default AddModal;
