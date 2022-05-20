import React from 'react';
import './style.css';
import { Typography, Button } from 'antd';
import ScreenImg from '../../assets/images/354a3d4a-d2a6-4cc8-8cdd-16bd7a66a18c-removebg-preview.png';

const { Title } = Typography;

const IntreviewerApp = () => (

  <div className="intreviewer-app">
    <div className="heading">
      <Title level={4} className="main-title">Get Our Aplication</Title>
      <Title level={2} className="sub-title">You Can Easily Join Our Team…!</Title>
      <Title level={5} className="description-title">Help us on our quest to make good software even better.</Title>
      <Button type="primary joinUs-btn">Join Us Now !</Button>
    </div>

    <div className="intreviewer-content-item">
      <img src={ScreenImg} alt="brandsImg" className="ScreenImg" />
    </div>
  </div>
);

export default IntreviewerApp;
