import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import 'style/main.scss';
import RecipeList from 'core/RecipeList';
import AddModal from 'core/AddModal';

class App extends Component {
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
      <div className="main_container">
        <RecipeList openModal={this.openModal} />
        <AddModal isOpen={open} isEdit={edit} closeModal={this.closeModal} />

        <div className="addButton">
          <Button variant="fab" color="primary" aria-label="add" onClick={() => this.setState({ open: true })}>
            <AddIcon />
          </Button>
        </div>

      </div>
    );
  }
}
export default App;
