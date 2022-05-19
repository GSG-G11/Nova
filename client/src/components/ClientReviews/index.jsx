import React from 'react';
import './style.css';
import { Typography, Carousel } from 'antd';
import clientReviewImg from '../../assets/images/904a4a83-28ae-4e34-b53b-0e4c7d09809a-removebg-preview.png';
import bgImg from '../../assets/images/3d1d398e-30b4-4cfa-9b11-10f312ebfab8-removebg-preview.png';

const { Title } = Typography;

const ClientReviews = () => (
  <div className="ClientReviews">
    <div className="heading">
      <Title level={2} className="sub-title">
        Happy Clients
      </Title>
      <Title level={5} className="description-title">
        What do our customers say?
      </Title>
    </div>
    <div className="partner-content">
      <div className="carsouel-holder">
        <Carousel autoplay>
          <div className="slide-content">
            <p>
              It really helped to boost my confidence up which was missing
              earlier. The Interviewer and the mentors I met were awesome, no
              doubt about it. I learned a lot of things from them that will
              definitely help me in the future.
            </p>
            <h3>Rowhan Smith</h3>
            <h4>CEO, Foreclosure</h4>
          </div>
          <div className="slide-content">
            <p>
              Overall, it was an amazing experience. I would highly recommend
              anybody who is sitting for their campus placements to at least get
              a mock interview session done before they sit for their actual
              interviews. Trust me, it will do wonders!.
            </p>
            <h3>Rohit Mohan</h3>
            <h4>CEO, Foreclosure</h4>
          </div>
          <div className="slide-content">
            <p>
              I was pleasantly surprised at my actual interview when almost all
              the questions on similar lines to the mock interview I attended at
              Preplaced. The mentor also helped me make my resume relevant for
              the company, thereby helping me to get shortlisted for the
              interview round.
            </p>
            <h3>Pranab Pathak</h3>
            <h4>Full Stack Developer</h4>
          </div>
        </Carousel>
      </div>
      <div className="partner-content-img">
        <img src={bgImg} alt="client-review" className="bgImg" />
        <img src={clientReviewImg} alt="clientImg" className="clientImg" />
      </div>
    </div>
  </div>
);
export default ClientReviews;
