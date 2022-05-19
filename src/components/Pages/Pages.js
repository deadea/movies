import Search from '../Search';
import NoConnection from '../../service/NoConnection';

const Pages = ({ activeTabKey, updateQuery, errorMessage, spinner, content }) => {
  const rated =
    activeTabKey === 2 ? (
      <NoConnection>
        <h1>RATED</h1>
      </NoConnection>
    ) : null;
  const search =
    activeTabKey === 1 ? (
      <>
        <Search updateQuery={updateQuery} />
        <NoConnection>
          {errorMessage}
          {spinner}
          {content}
        </NoConnection>
      </>
    ) : null;
  return (
    <>
      {rated}
      {search}
    </>
  );
};

export default Pages;
