import React from 'react';
import SectionIntro from '../common/SectionIntro';
import brandImg from '../../assets/images/brands.png';
import './style.css';

const Partner = () => (
  <div className="partner">
    <SectionIntro
      action="Our Partners"
      title="Get Interview questions from real companies"
      description="Practice in real time with questions directly taken from their official questions banks."
    />

    <div className="partner-content">
      <div className="partner-content-item">
        <img src={brandImg} alt="brandsImg" className="brandImg" />
      </div>
    </div>
  </div>
);

export default Partner;
