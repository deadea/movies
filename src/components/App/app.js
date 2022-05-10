import React from 'react';

import CardList from '../CardList';
import Spinner from '../Spinner';
import PageTabs from '../PageTabs';
import ApiService from '../../service/ApiService';

import './app.css';

export default class App extends React.Component {
  apiService = new ApiService();
  state = {
    cards: [],
    loading: true,
  };
  constructor() {
    super();
    this.getData();
  }
  onDataLoaded(data) {
    this.setState({
      cards: data,
      loading: false,
    });
  }
  getData() {
    this.apiService.getAllMovies().then((result) => {
      this.onDataLoaded(result);
    });
  }

  render() {
    const { cards, loading } = this.state;
    const spinner = loading ? <Spinner /> : null;
    const content = !loading ? <CardList cards={cards} /> : null;

    return (
      <>
        <div className="wrapper">
          <PageTabs />
          {spinner}
          {content}
        </div>
      </>
    );
  }
}
