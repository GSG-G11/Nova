import React from 'react';
import { Typography, Tag } from 'antd';
import PropTypes from 'prop-types';

const { Text } = Typography;
const tagColor = {
  easy: 'green',
  medium: 'orange',
  hard: 'red',
};
const Challenge = ({
  name, title, tag, link,
}) => (
  <div className="top-challenges__card" onClick={() => window.open(link)} aria-hidden>
    <Text strong className="top-challenges__card-title">{title}</Text>
    <Text strong className="top-challenges__card-name">{name}</Text>
    <Tag
      color={tagColor[tag]}
      className="top-challenges__card-tag"
    >
      <Text strong>{tag}</Text>
    </Tag>
  </div>
);

Challenge.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
export default Challenge;
