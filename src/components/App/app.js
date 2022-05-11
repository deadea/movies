import React from 'react';

import CardList from '../CardList';
import Spinner from '../Spinner';
import PageTabs from '../PageTabs';
import Search from '../Search';
import ErrorMessage from '../ErrorMessage';
import ApiService from '../../service/ApiService';
import NoConnection from '../../service/NoConnection';

import './app.css';

export default class App extends React.Component {
  apiService = new ApiService();
  state = {
    cards: [],
    loading: true,
    error: false,
    errObject: {},
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
  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
      errObject: err,
    });
  };
  getData() {
    this.apiService
      .getAllMovies('return')
      .then((result) => {
        this.onDataLoaded(result);
      })
      .catch(this.onError);
  }

  render() {
    const { cards, loading, error, errObject } = this.state;
    const hasData = !(loading || error);
    const errorMessage = error ? <ErrorMessage errObject={errObject} /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <CardList cards={cards} /> : null;

    return (
      <>
        <div className="wrapper">
          <PageTabs />
          <Search />
          <NoConnection>
            {errorMessage}
            {spinner}
            {content}
          </NoConnection>
        </div>
      </>
    );
  }
}
