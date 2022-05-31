import React, { useState, useEffect } from 'react';
import { Result } from 'antd';

const NoInternetConnection = (props) => {
  const [isOnline, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);
  }, []);

  window.addEventListener('online', () => {
    setOnline(true);
  });

  window.addEventListener('offline', () => {
    setOnline(false);
  });

  if (isOnline) {
    return props.children;
  } else {
    return (
      <Result
        status="500"
        title="No Internet connection"
        subTitle="Something went wrong, please check your Internet connection"
      />
    );
  }
};

export default NoInternetConnection;
