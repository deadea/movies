import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import './footer.css';

const Footer = ({ page, totalResults, updatePage }) => {
  const [currentPage, setPage] = useState(1);
  const onChange = (e) => {
    setPage(e);
    updatePage(e);
  };

  return (
    <Pagination
      defaultCurrent={1}
      current={page}
      total={totalResults}
      pageSize={20}
      responsive
      showSizeChanger={false}
      onChange={onChange}
    />
  );
};

export default Footer;

Footer.defaultProps = {
  page: 0,
  totalResults: 0,
  updatePage: () => {},
};

Footer.propTypes = {
  page: PropTypes.number,
  totalResults: PropTypes.number,
  updatePage: PropTypes.func,
};
