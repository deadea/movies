import React from 'react';
import { Button } from 'antd';

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
    movies: [],
    rated: [],
    loading: true,
    error: false,
    errObject: {},
    query: 'return',
    page: 1,
    pageRated: 1,
    totalResults: 0,
    totalResultsRated: 0,
    activeTabKey: 1,
    sessionId: JSON.parse(localStorage.getItem('guest_session_id')) || null,
  };
  componentDidMount() {
    this.getData(this.state.query, this.state.page);
    if (this.state.sessionId !== null) {
      this.getRated();
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query || this.state.page !== prevState.page) {
      this.getData(this.state.query, this.state.page);
    }
    if (this.state.pageRated !== prevState.pageRated) {
      this.getRated();
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }
  onDataLoaded(result) {
    this.setState({
      movies: result.results,
      loading: false,
      totalResults: result.total_results,
    });
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
      errObject: err,
    });
  };
  alertClosed = () => {
    this.setState({ error: false });
  };
  getData(query, page) {
    this.apiService
      .getAllMovies(query, page)
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
      page: 1,
    });
  };
  updatePage = (newpage) => {
    this.setState({
      page: newpage,
    });
  };
  updatePageRated = (newpage) => {
    this.setState({
      pageRated: newpage,
    });
  };
  changeTab = (tabKey) => {
    this.setState({
      activeTabKey: tabKey,
    });
  };
  createSession = () => {
    this.apiService
      .getGuestSessionId()
      .then((result) => {
        localStorage.setItem('guest_session_id', JSON.stringify(result));
        this.setState({
          sessionId: result,
        });
      })
      .catch(this.onError);
  };

  rateMovie = (movie, stars) => {
    this.apiService
      .rateMovie(movie, this.state.sessionId, stars) //ID ИЗ LOCALSTORAGE
      .then(() => {
        this.timeoutId = setTimeout(this.getRated, 1000);
      })
      .catch(this.onError);
  };

  getRated = () => {
    this.apiService
      .getGuestRated(this.state.sessionId, this.state.pageRated)
      .then((result) => {
        this.setState({
          rated: result.results,
          //loading: false,
          totalResultsRated: result.total_results,
        });
      })
      .catch(this.onError);
  };

  render() {
    const {
      movies,
      rated,
      loading,
      error,
      errObject,
      page,
      pageRated,
      totalResults,
      totalResultsRated,
      activeTabKey,
      sessionId,
    } = this.state;
    const hasData = !(loading || error);
    const errorMessage = error ? <ErrorMessage errObject={errObject} alertClosed={this.alertClosed} /> : null;
    const spinner = loading ? <Spinner /> : null;
    const tabContent =
      activeTabKey === 1 ? (
        <CardList movies={movies} rated={rated} rateMovie={this.rateMovie} />
      ) : (
        <CardList movies={rated} rated={rated} rateMovie={this.rateMovie} />
      );
    const content = hasData ? tabContent : null;
    const search = activeTabKey === 1 ? <Search updateQuery={this.updateQuery} /> : null;
    const sessionBtn =
      sessionId === null ? (
        <Button type="default" shape="round" onClick={this.createSession}>
          Create guest session to rate movies
        </Button>
      ) : null;

    const footer =
      activeTabKey === 1 ? (
        <Footer page={page} totalResults={totalResults} updatePage={this.updatePage} />
      ) : (
        <Footer page={pageRated} totalResults={totalResultsRated} updatePage={this.updatePageRated} />
      );

    return (
      <div className="wrapper">
        {sessionBtn}
        <PageTabs changeTab={this.changeTab} />
        {search}
        <NoConnection>
          {errorMessage}
          {spinner}
          {content}
        </NoConnection>
        {footer}
      </div>
    );
  }
}
