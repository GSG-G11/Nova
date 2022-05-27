import React from 'react';
import { Typography } from 'antd';
import './style.css';
import PropTypes from 'prop-types';

const { Title } = Typography;
const SectionIntro = ({ action, title, description }) => (
  <div className="section-intro">
    <Title level={4} className="section-intro__action">{action}</Title>
    <Title level={2} className="section-intro__title">{title}</Title>
    <Title level={5} className="section-intro__description">{description}</Title>

  </div>
);

SectionIntro.propTypes = {
  action: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
export default SectionIntro;
