import React from 'react';

import CardList from '../CardList';
import ApiService from '../../service/ApiService';

import './app.css';

export default class App extends React.Component {
  apiService = new ApiService();
  state = {
    cards: [],
  };
  constructor() {
    super();
    this.getData();
  }
  getData() {
    this.apiService.getAllMovies().then((result) => {
      this.setState({ cards: result });
    });
  }

  render() {
    return (
      <div className="wrapper">
        <CardList cards={this.state.cards} />
      </div>
    );
  }
}
