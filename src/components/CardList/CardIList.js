import PropTypes from 'prop-types';

import CardItem from '../CardItem';
import './cardList.css';

const CardList = ({ movies, rated, rateMovie }) => {
  const elements = movies.map((item) => {
    const { id, ...itemprops } = item;

    return <CardItem key={id} id={id} rated={rated} rateMovie={rateMovie} {...itemprops} />;
  });

  return <ul className="card-list">{elements}</ul>;
};

export default CardList;

CardList.defaultProps = {
  movies: [{}],
  rated: [{}],
  rateMovie: () => {},
};

CardList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  rated: PropTypes.arrayOf(PropTypes.object),
  rateMovie: PropTypes.func,
};
