import React from 'react';
import './style.css';
import { Carousel } from 'antd';
import clientReviewImg from '../../assets/images/client.png';
import SlideCard from './SliderCard';
import bgImg from '../../assets/images/square.png';
import SectionIntro from '../common/SectionIntro';

const ClientReviews = () => (
  <div className="ClientReviews">
    <SectionIntro
      action="Client Reviews"
      title="Happy Clients"
      description="What do our customers say?"
    />

    <div className="partner-content">
      <div className="carsouel-holder">
        <Carousel autoplay>
          <SlideCard
            content="It really helped to boost my confidence up which was missing
            earlier. The Interviewer and the mentors I met were awesome, no
            doubt about it. I learned a lot of things from them that will
            definitely help me in the future."
            clientName="Rowhan Smith"
            clientTitle="Frontend developer"
          />
          <SlideCard
            content="Overall, it was an amazing experience. I would highly recommend
            anybody who is sitting for their campus placements to at least get
            a mock interview session done before they sit for their actual
            interviews. Trust me, it will do wonders!"
            clientName="Pranab Pathak"
            clientTitle="Full Stack Developer"
          />
          <SlideCard
            content="I was pleasantly surprised at my actual interview when almost all
              the questions on similar lines to the mock interview I attended at
              Replaced. The mentor also helped me make my resume relevant for
              the company, thereby helping me to get shortlisted for the
              interview round."
            clientName="Rohit Mohan"
            clientTitle="CEO, Foreclosure"
          />
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
