import React from 'react';

import CardList from '../CardList';
import Spinner from '../Spinner';
import PageTabs from '../PageTabs';
import Pages from '../Pages';
//import Search from '../Search';
import Footer from '../Footer';
import ErrorMessage from '../ErrorMessage';
import ApiService from '../../service/ApiService';
//import NoConnection from '../../service/NoConnection';

import './app.css';

export default class App extends React.Component {
  apiService = new ApiService();
  state = {
    cards: [],
    loading: true,
    error: false,
    errObject: {},
    query: 'return',
    page: 1,
    totalResults: 0,
    activeTabKey: 1,
  };
  componentDidMount() {
    this.getData(this.state.query, this.state.page);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query || this.state.page !== prevState.page) {
      this.getData(this.state.query, this.state.page);
    }
  }
  onDataLoaded({ results, total_results }) {
    this.setState({
      cards: results,
      loading: false,
      totalResults: total_results,
    });
  }
  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
      errObject: err,
    });
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
  changeTab = (tabKey) => {
    this.setState({
      activeTabKey: tabKey,
    });
  };

  render() {
    const { cards, loading, error, errObject, page, totalResults, activeTabKey } = this.state;
    const hasData = !(loading || error);
    const errorMessage = error ? <ErrorMessage errObject={errObject} /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <CardList cards={cards} /> : null;

    return (
      <div className="wrapper">
        <PageTabs changeTab={this.changeTab} />
        <Pages
          activeTabKey={activeTabKey}
          updateQuery={this.updateQuery}
          errorMessage={errorMessage}
          spinner={spinner}
          content={content}
        />

        <Footer page={page} totalResults={totalResults} updatePage={this.updatePage} />
      </div>
    );
  }
}
