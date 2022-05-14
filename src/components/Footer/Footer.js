import { Pagination } from 'antd';
import './footer.css';

const Footer = () => {
  return <Pagination defaultCurrent={1} total={50} />;
};

export default Footer;
