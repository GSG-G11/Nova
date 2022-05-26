import React from 'react';
import { Typography } from 'antd';
import LoadingSpinner from '../common/LoadingSpinner';

const { Title } = Typography;
const LoadingHome = () => (
  <div className="loading-home">
    <Title level={4}>
      Loading ...
    </Title>
    <LoadingSpinner />
  </div>
);

export default LoadingHome;
