import React from 'react';
import { Spin } from 'antd';

import { LoadingOutlined } from '@ant-design/icons';

const LoadingSpinner = () => (
  <Spin indicator={<LoadingOutlined style={{ fontSize: 58, color: '#591871' }} spin />} />
);

export default LoadingSpinner;
