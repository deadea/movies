import React, { useState } from 'react';
import { Input } from 'antd';
import debounce from 'lodash.debounce';
import './search.css';

const Search = ({ updateQuery }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleChange = (e) => {
    if (e.target.value !== '') {
      setSearchTerm(e.target.value);
      updateQuery(e.target.value);
    }
  };
  const debouncedSearch = debounce(handleChange, 700);
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={onSubmit}>
      <Input placeholder="Type to search..." onChange={debouncedSearch} />
    </form>
  );
};
export default Search;
