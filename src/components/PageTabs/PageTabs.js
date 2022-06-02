import PropTypes from 'prop-types';
import { Tabs } from 'antd';

import { tabNames } from './tabNames';

const { TabPane } = Tabs;

const PageTabs = ({ changeTab }) => {
  const onTabClick = (key) => {
    changeTab(parseInt(key));
  };
  return (
    <Tabs size="large" onChange={onTabClick}>
      <TabPane tab={tabNames[1]} key="1"></TabPane>
      <TabPane tab={tabNames[2]} key="2"></TabPane>
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
