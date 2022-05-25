import React from 'react';
import './style.css';
import { Typography } from 'antd';
import ScreenImg from '../../assets/images/joinus.png';
import JoinUsBtn from './JoinUsBtn';

const { Title } = Typography;

const IntreviewerApp = () => (

  <div className="intreviewer-app">
    <div className="heading">
      <Title level={4} className="main-title">Get Our Application</Title>
      <Title level={2} className="sub-title">You Can Easily Join Our Team…!</Title>
      <Title level={5} className="description-title">Help us on our quest to make good software even better.</Title>
      <JoinUsBtn />
    </div>

    <div className="intreviewer-content-item">
      <img src={ScreenImg} alt="brandsImg" className="ScreenImg" />
    </div>
  </div>
);

export default IntreviewerApp;
