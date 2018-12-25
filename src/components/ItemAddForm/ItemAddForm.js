import React, { Component } from 'react';
import './itemAddForm.css'

export default class ItemAddForm extends Component {

  state = {
    label: ''
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if(this.state.label.length){
      this.props.onItemAdded(this.state.label);
      this.setState({
        label: ''
      });
    }
  };

  render() {
    return (
      <form className="item-add-form"
            onSubmit={ this.onSubmit }>
        <input type="text"
               className="form-control"
               onChange={ this.onLabelChange }
               placeholder="What needs to be done"
               value={ this.state.label }/>
        <button>
          Add Item
        </button>
      </form>
    )
  }

}