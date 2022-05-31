import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import debounce from 'lodash.debounce';
import './search.css';

const Search = ({ updateQuery }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleChange = (e) => {
    let request = e.target.value.trim();
    if (request === '') {
      return;
    }
    setSearchTerm(request);
    updateQuery(request);
  };
  const debouncedSearch = debounce(handleChange, 700);
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={onSubmit}>
      <Input placeholder="Type to search..." onChange={debouncedSearch} allowClear autoFocus />
    </form>
  );
};
export default Search;

Search.defaultProps = {
  updateQuery: () => {},
};

Search.propTypes = {
  updateQuery: PropTypes.func,
};
