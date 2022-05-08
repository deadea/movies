import CardItem from '../CardItem';

import './cardList.css';

const CardList = ({ cards }) => {
  const elements = cards.map((item) => {
    const { id, ...itemprops } = item;

    return <CardItem key={id} {...itemprops} />;
  });

  return <ul className="card-list">{elements}</ul>;
};

export default CardList;
