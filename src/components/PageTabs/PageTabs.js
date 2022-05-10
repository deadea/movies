import { Tabs } from 'antd';
import './pageTabs.css';

const { TabPane } = Tabs;

const PageTabs = () => {
  return (
    <Tabs size="large">
      <TabPane tab="Search" key="1"></TabPane>
      <TabPane tab="Rated" key="2"></TabPane>
    </Tabs>
  );
};

export default PageTabs;
