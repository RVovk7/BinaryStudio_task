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
    };
  }

  closeModal = () => {
    this.setState({
      open: false,
    });
  }

  render() {
    const { open } = this.state;
    return (
      <div className="main_container">
        <RecipeList />
        <AddModal isOpen={open} closeModal={this.closeModal} />

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
