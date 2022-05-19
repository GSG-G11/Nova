import React from 'react';
import { Typography, Tag } from 'antd';
import './style.css';

const { Title, Text } = Typography;
const Challenges = () => (
  <section className="top-challenges">
    <Title level={3} className="top-challenges__title">Top Challenges</Title>
    <div className="top-challenges__cards">
      <div className="top-challenges__card">
        <Text strong className="top-challenges__card-title">Challenge Title</Text>
        <Text strong className="top-challenges__card-name">Challenge name</Text>
        <Tag color="green" className="top-challenges__card-tag">
          <Text strong>easy</Text>
        </Tag>

      </div>
      <div className="top-challenges__card">
        <Text strong className="top-challenges__card-title">Challenge Title</Text>
        <Text strong className="top-challenges__card-name">Challenge name</Text>
        <Tag color="green" className="top-challenges__card-tag">
          <Text strong>easy</Text>
        </Tag>

      </div>
      <div className="top-challenges__card">
        <Text strong className="top-challenges__card-title">Challenge Title</Text>
        <Text strong className="top-challenges__card-name">Challenge name</Text>
        <Tag color="green" className="top-challenges__card-tag">
          <Text strong>easy</Text>
        </Tag>

      </div>
    </div>
  </section>
);

export default Challenges;
