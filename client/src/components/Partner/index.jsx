import React from 'react';
import { Typography } from 'antd';
import './style.css';
import brandImg from '../../assets/images/083adf8b-2a2d-4e54-abf5-05853368fe0e-removebg-preview.png';

const { Title } = Typography;

const Partner = () => (
  <div className="partner">
    <Title level={4} className="main-title">OUR PARTNERS</Title>
    <Title level={2} className="sub-title">Get Interview questions from real companies</Title>
    <Title level={5} className="description-title">Practice in real time with questions directly taken from their official questions banks.</Title>

    <div className="partner-content">
      <div className="partner-content-item">
        <img src={brandImg} alt="brandsImg" className="brandImg" />
      </div>
    </div>
  </div>
);

export default Partner;
