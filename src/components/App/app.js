import React from 'react';

import CardList from '../CardList';
import Spinner from '../Spinner';
import PageTabs from '../PageTabs';
import Search from '../Search';
import Footer from '../Footer';
import ErrorMessage from '../ErrorMessage';
import apiService from '../../service/ApiService';
import NoConnection from '../../service/NoConnection';
import { Provider } from '../../service-context/service-context';
import storage from '../../service/storage';

import './app.css';
const dotenv = require('dotenv-expand');

export default class App extends React.Component {
  state = {
    movies: [],
    rated: [],
    genres: [],
    loading: true,
    error: false,
    errObject: {},
    query: 'return',
    page: 1,
    pageRated: 1,
    totalResults: 0,
    totalResultsRated: 0,
    activeTabKey: 1,
    sessionId: JSON.parse(storage.getFromStorage('guest_session_id')) || null,
  };
  componentDidMount() {
    this.getGenres();
    if (JSON.parse(storage.getFromStorage('guest_session_id')) === null) {
      this.createSession();
    }
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
    window.scrollTo(0, 0);
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
    apiService
      .getAllMovies(query, page)
      .then((result) => {
        if (result.total_results === 0) {
          throw new Error('404');
        }
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
      error: false,
    });
  };
  createSession = () => {
    apiService
      .getGuestSessionId()
      .then((result) => {
        if (result.success) {
          storage.setToStorage('guest_session_id', JSON.stringify(result.guest_session_id));
          this.setState({
            sessionId: result.guest_session_id,
          });
        } else {
          throw new Error('401');
        }
      })
      .catch(this.onError);
  };

  rateMovie = (movie, stars) => {
    apiService
      .rateMovie(movie, this.state.sessionId, stars)
      .then((result) => {
        if (result.success) {
          this.timeoutId = setTimeout(this.getRated, 1000);
        } else {
          throw new Error('401');
        }
      })
      .catch(this.onError);
  };

  getRated = () => {
    apiService
      .getGuestRated(this.state.sessionId, this.state.pageRated)
      .then((result) => {
        this.setState({
          rated: result.results,
          totalResultsRated: result.total_results,
        });
      })
      .catch(this.onError);
  };

  getGenres = () => {
    apiService
      .getGenres()
      .then((result) => {
        if (!result.success) {
          this.setState({
            genres: result,
          });
        } else {
          throw new Error('404');
        }
      })
      .catch(this.onError);
  };

  render() {
    const {
      movies,
      rated,
      genres,
      loading,
      error,
      errObject,
      page,
      pageRated,
      totalResults,
      totalResultsRated,
      activeTabKey,
    } = this.state;

    let tabContent = <CardList movies={movies} rated={rated} rateMovie={this.rateMovie} />;
    let search = <Search updateQuery={this.updateQuery} />;
    let footer = <Footer page={page} totalResults={totalResults} updatePage={this.updatePage} />;
    const tabs = { 1: 'Search', 2: 'Rated' };
    if (tabs[activeTabKey] === 'Rated') {
      tabContent = <CardList movies={rated} rated={rated} rateMovie={this.rateMovie} />;
      search = null;
      footer = <Footer page={pageRated} totalResults={totalResultsRated} updatePage={this.updatePageRated} />;
    }

    const hasData = !(loading || error);
    const content = hasData ? tabContent : null;
    const errorMessage = error ? <ErrorMessage errObject={errObject} alertClosed={this.alertClosed} /> : null;
    const spinner = loading && <Spinner />;

    return (
      <Provider value={genres}>
        <div className="wrapper">
          <PageTabs changeTab={this.changeTab} />
          {search}
          <NoConnection>
            {errorMessage}
            {spinner}
            {content}
          </NoConnection>
          {footer}
        </div>
      </Provider>
    );
  }
}
