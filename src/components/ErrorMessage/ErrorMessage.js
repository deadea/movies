import { Alert } from 'antd';
import './errorMessage.css';

const ErrorMessage = ({ errObject }) => {
  let text = '';
  if (errObject.message === '404') {
    text = 'No movies found by such query';
  } else text = 'Something went wrong, please try another query';

  return (
    <div className="error-container">
      <Alert message="Error" description={text} type="error" showIcon closable />
    </div>
  );
};

export default ErrorMessage;
