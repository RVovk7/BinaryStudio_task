import React, { Component } from 'react';
import RecipeList from 'core/RecipeList';
import AddModal from 'core/AddModal';
import 'style/main.scss';

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

  openAdd = () => {
    this.setState({
      open: true,
      edit: false,
    });
  }

  render() {
    const { open, edit } = this.state;
    return (
      <div>
        <div className="main_container">
          <div className="recipe_container">
            <RecipeList openModal={this.openModal} openAdd={this.openAdd} />
          </div>

          <AddModal isOpen={open} isEdit={edit} closeModal={this.closeModal} />
        </div>
      </div>
    );
  }
}
export default App;
