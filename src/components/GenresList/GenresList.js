import { Button } from 'antd';
import React from 'react';

import './genresList.css';

export default class GenresList extends React.Component {
  render() {
    const { genres, genre_ids } = this.props;
    return (
      <div className="card-item--genres">
        {genres.map((item) =>
          genre_ids.map(
            (genre) =>
              item.id === genre && (
                <Button size="small" disabled key={item.id} className="genre">
                  {item.name}
                </Button>
              )
          )
        )}
      </div>
    );
  }
}
