import PropTypes from 'prop-types';
import { Button } from 'antd';
import React from 'react';

import './genresList.css';

export default class GenresList extends React.Component {
  static defaultProps = {
    genres: [{}],
    genre_ids: [],
  };

  static propTypes = {
    genres: PropTypes.arrayOf(PropTypes.object),
    genre_ids: PropTypes.arrayOf(PropTypes.number),
  };
  render() {
    const { genres, genre_ids } = this.props;
    return (
      <div className="card-item--genres">
        {genres.map((item) =>
          genre_ids.map(
            (genre) =>
              item.id === genre && (
                <Button size="small" disabled ghost key={item.id} className="genre">
                  {item.name}
                </Button>
              )
          )
        )}
      </div>
    );
  }
}
