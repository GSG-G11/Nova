import React from 'react';
import './style.css';
import { Typography } from 'antd';
import { LaptopOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const Resources = () => (
  <section className="resources">
    <div className="resources__text">
      <Title className="resources__title" level={1}>Resources for you</Title>
      <Text className="resources__text-content">Explore many websites, are some links for most useful resources</Text>
    </div>
    <div className="resources__box">
      <LaptopOutlined className="resources__icon" />
      <Text className="resources__box-text">InterviewCake</Text>
    </div>

    <div className="resources__box">
      <LaptopOutlined className="resources__icon" />
      <Text className="resources__box-text">Interviewing.io</Text>
    </div>

    <div className="resources__box">
      <LaptopOutlined className="resources__icon" />
      <Text className="resources__box-text">InterviewBit</Text>
    </div>
  </section>
);

export default Resources;
