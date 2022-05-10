import React from 'react';
import { Input } from 'antd';
import './search.css';

export default class Search extends React.Component {
  state = {
    label: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.setState({
      label: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <Input placeholder="Type to search..." onChange={this.onLabelChange} value={this.state.label} />
      </form>
    );
  }
}
