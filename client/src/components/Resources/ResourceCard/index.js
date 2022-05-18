import React from 'react';
import { Typography } from 'antd';
import propTypes from 'prop-types';

const { Text } = Typography;
const ResourceCard = ({ image, title, description }) => (
  <div className="resources__resource-card">
    <img
      className="resources__img"
      alt="resources"
      src={image}
    />
    <div className="resources__resource-card-text">
      <Text className="resources__resource-title">{title}</Text>
      <Text className="resources__resource-description">
        {description}
        {' '}
      </Text>
    </div>
  </div>
);

ResourceCard.propTypes = {
  image: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
};

export default ResourceCard;
