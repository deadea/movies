import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import './pageTabs.css';

const { TabPane } = Tabs;

const PageTabs = ({ changeTab }) => {
  const onTabClick = (key) => {
    changeTab(parseInt(key));
  };
  return (
    <Tabs size="large" onChange={onTabClick}>
      <TabPane tab="Search" key="1"></TabPane>
      <TabPane tab="Rated" key="2"></TabPane>
    </Tabs>
  );
};

export default PageTabs;

PageTabs.defaultProps = {
  changeTab: () => {},
};

PageTabs.propTypes = {
  changeTab: PropTypes.func,
};
