import React, { Component } from 'react';
import PropTypes from 'prop-types';
// styles
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import 'style/main.scss';
// styles
import RecipeList from 'core/RecipeList';
import AddModal from 'core/AddModal';


const styles = theme => ({
  fab: {
    margin: theme.spacing.unit * 2,
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
});

class App extends Component {
  static propTypes = {
    classes: PropTypes.instanceOf(Object).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      edit: false,
    };
  }

  closeModal = () => {
    this.setState({
      open: false,
    });
  }

  openModal = () => {
    this.setState({
      open: true,
      edit: true,
    });
  }

  render() {
    const { open, edit } = this.state;
    return (
      <div>
        <div className="main_container">
          <div className="recipe_container">
            <RecipeList openModal={this.openModal} />
            <div className="addButton">
              <Button variant="fab" color="primary" aria-label="add" onClick={() => this.setState({ open: true, edit: false })}>
                <AddIcon />
              </Button>
            </div>
          </div>

          <AddModal isOpen={open} isEdit={edit} closeModal={this.closeModal} />
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(App);
