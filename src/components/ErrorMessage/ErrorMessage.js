import { Alert } from 'antd';
import './errorMessage.css';

const ErrorMessage = ({ errObject, alertClosed }) => {
  let text = '';
  if (errObject.message === '404') {
    text = 'The resource you requested could not be found';
  } else if (errObject.message === '401') {
    text = 'Not possible to create session at the moment';
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
