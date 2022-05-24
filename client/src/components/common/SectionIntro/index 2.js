import React from 'react';
import { Typography } from 'antd';
import './style.css';
import PropTypes from 'prop-types';

const { Text } = Typography;
const SectionIntro = ({ action, title, description }) => (
  <div className="section-intro">
    <Text className="section-intro__action">
      {action}
    </Text>
    <Text className="section-intro__title">
      {title}
    </Text>
    <Text className="section-intro__description">
      {description}
    </Text>
  </div>
);

SectionIntro.propTypes = {
  action: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
export default SectionIntro;
