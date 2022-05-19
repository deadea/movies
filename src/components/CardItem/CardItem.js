import React from 'react';
// eslint-disable-next-line
import { Button } from 'antd';
// eslint-disable-next-line
import { Rate } from 'antd';
import './cardItem.css';
import { format } from 'date-fns';
import classNames from 'classnames';

import icon from './no-image.png';

export default class CardItem extends React.Component {
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
    if (text.length > 205) {
      let sliced = text.substring(0, 205);
      sliced = sliced.substring(0, Math.min(sliced.length, sliced.lastIndexOf(' ')));
      if (sliced[sliced.length - 1] === ',') {
        sliced = sliced.substring(0, sliced.length - 1);
      }
      return `${sliced} ...`;
    } else return text;
  }
  render() {
    const { original_title: title, overview } = this.props;
    const titleClassName = classNames('card-item--title', { long: title.length > 30 });
    return (
      <li className="card-item">
        <img src={this.getPoster()} alt={'movie poster'}></img>
        <div className="card-item--container">
          <div className="card-item--wrapper">
            <img src={this.getPoster()} alt={'movie poster'}></img>
            <div>
              <span className={titleClassName}>{title}</span>
              <span className="card-item--date">{this.formatDate()}</span>
              <div className="card-item--genres">
                <Button size="small">Action</Button>
                <Button size="small">Drama</Button>
              </div>
            </div>
            <p className="card-item--description">{this.textSlice(overview)}</p>
          </div>
          <Rate defaultValue={this.props.vote_average} count="10" />
        </div>
      </li>
    );
  }
}
