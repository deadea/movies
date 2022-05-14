import React from 'react';

import CardList from '../CardList';
import Spinner from '../Spinner';
import PageTabs from '../PageTabs';
import Search from '../Search';
import Footer from '../Footer';
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
    query: 'return',
  };
  componentDidMount() {
    this.getData(this.state.query);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query) {
      this.getData(this.state.query);
    }
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
  getData(query) {
    this.apiService
      .getAllMovies(query)
      .then((result) => {
        this.onDataLoaded(result);
      })
      .catch(this.onError);
  }
  updateQuery = (newQuery) => {
    this.setState({
      query: newQuery,
      loading: true,
      error: false,
    });
  };

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
          <Search updateQuery={this.updateQuery} />
          <NoConnection>
            {errorMessage}
            {spinner}
            {content}
          </NoConnection>
          <Footer />
        </div>
      </>
    );
  }
}
