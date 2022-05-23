import React from 'react';
import './style.css';
import { Typography } from 'antd';
import PropTypes from 'prop-types';

const { Title, Text } = Typography;

const SlideCard = ({ content, clientName, clientTitle }) => (
  <div className="slide-content">
    <Text className="slide-desc">
      {content}
    </Text>
    <Title level={3} className="clientName">{clientName}</Title>
    <Title level={3} className="clientTitle">{clientTitle}</Title>
  </div>
);
SlideCard.propTypes = {
  content: PropTypes.string.isRequired,
  clientName: PropTypes.string.isRequired,
  clientTitle: PropTypes.string.isRequired,
};
export default SlideCard;
