import PropTypes from 'prop-types';
import { Alert } from 'antd';
import './errorMessage.css';

const ErrorMessage = ({ errObject, alertClosed }) => {
  let text = '';
  if (errObject.message === '404') {
    text = 'The resource you requested could not be found';
  } else if (errObject.message === '401') {
    text = 'Need a valid session to do that';
  } else {
    text = 'Something went wrong, please try later';
  }

  return (
    <div className="error-container">
      <Alert message="Error" description={text} type="error" showIcon closable onClose={alertClosed} />
    </div>
  );
};

export default ErrorMessage;

ErrorMessage.defaultProps = {
  errObject: {},
  alertClosed: () => {},
};

ErrorMessage.propTypes = {
  errObject: PropTypes.object,
  alertClosed: PropTypes.func,
};
