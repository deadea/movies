import './cardItem.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Rate } from 'antd';
import { format } from 'date-fns';
import classNames from 'classnames';

import { Consumer } from '../../service-context/service-context';
import GenresList from '../GenresList';
import icon from '../../assets/no-image.png';

import { COLORS } from './cardRatingColor';
import { MAX_LENGTH } from './cardMaxLength';

export default class CardItem extends React.Component {
  static defaultProps = {
    rateMovie: () => {},
  };

  static propTypes = {
    rateMovie: PropTypes.func,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.rated !== prevProps.rated) {
      this.getRating();
    }
  }

  formatDate() {
    try {
      const date = format(new Date(this.props.release_date), 'MMMM dd, yyyy');
      return date;
    } catch (err) {
      if (err.name === 'RangeError') {
        return 'No release date';
      } else throw err;
    }
  }
  getPoster() {
    let url = `https://image.tmdb.org/t/p/w200${this.props.poster_path}`;
    if (!this.props.poster_path) {
      url = icon;
    }
    return url;
  }
  textSlice(text) {
    if (text.length > MAX_LENGTH) {
      let sliced = text.substring(0, MAX_LENGTH);
      sliced = sliced.substring(0, Math.min(sliced.length, sliced.lastIndexOf(' ')));
      if (sliced[sliced.length - 1] === ',') {
        sliced = sliced.substring(0, sliced.length - 1);
      }
      return `${sliced} ...`;
    } else return text;
  }

  getColor() {
    if (this.props.vote_average <= 3) {
      return COLORS.AWFUL;
    } else if (this.props.vote_average <= 5) {
      return COLORS.BAD;
    } else if (this.props.vote_average <= 7) {
      return COLORS.AVERAGE;
    } else {
      return COLORS.GOOD;
    }
  }
  getRating = () => {
    const idx = this.props.rated.findIndex((el) => el.id === this.props.id);
    if (idx < 0) {
      return null;
    } else return this.props.rated[idx].rating;
  };
  sendRating = (value) => {
    this.props.rateMovie(this.props.id, value);
  };

  render() {
    const { original_title: title, overview, vote_average, genre_ids } = this.props;
    const titleClassName = classNames('card-item--title', { long: title.length > 30 });

    return (
      <li className="card-item">
        <img src={this.getPoster()} alt={'movie poster'}></img>
        <div className="card-item--container">
          <div className="card-item--wrapper">
            <img src={this.getPoster()} alt={'movie poster'}></img>
            <div className="card-item--header">
              <span className={titleClassName}>{title}</span>
              <div className="rating-outer" style={{ borderColor: this.getColor() }}>
                <span className="rating-inner">{vote_average}</span>
              </div>
              <span className="card-item--date">{this.formatDate()}</span>
              <Consumer>
                {({ genres }) => {
                  return <GenresList genre_ids={genre_ids} genres={genres} />;
                }}
              </Consumer>
            </div>
            <p className="card-item--description">{this.textSlice(overview)}</p>
          </div>
          <Rate allowHalf defaultValue={0} value={this.getRating()} count="10" onChange={this.sendRating} />
        </div>
      </li>
    );
  }
}
