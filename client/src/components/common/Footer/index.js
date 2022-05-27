import React from 'react';
import './style.css';
import { Typography } from 'antd';
import {
  TwitterCircleFilled,
  FacebookFilled, LinkedinFilled,
} from '@ant-design/icons';

const { Title, Text } = Typography;
const Footer = () => (
  <footer className="footer">
    <Title level={2} className="footer__title">
      Reviews. Resources. Feedback.
    </Title>
    <Text className="footer__text">
      We understand how important it is for you to find a good job and settle down.
      We will help you to find one by preparing you to change your
      job interview to a permanent career success story.
    </Text>
    <hr className="footer__seperator" />
    <Text className="footer__rights">
      @ 2022 Nova. All Rights Reserved
    </Text>
    <div className="footer__social-media">
      <TwitterCircleFilled className="footer__icon" />
      <FacebookFilled className="footer__icon" />
      <LinkedinFilled className="footer__icon" />
    </div>
  </footer>
);

export default Footer;
