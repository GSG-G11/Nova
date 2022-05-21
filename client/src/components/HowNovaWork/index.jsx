import { Layout, Typography } from 'antd';
import React from 'react';
import './style.css';
import union from '../../assets/images/Union.png';
import getPaired from '../../assets/images/Image.png';
// import practice from '../../assets/images/pexels-cottonbro-6140202.png';
// import actIt from '../../assets/images/pexels-pixabay-163064.png';

const { Content } = Layout;
const { Title } = Typography;

const HowNovaWork = () => (
  <Layout>
    <Content
      className="site-layout-background HowNovaWork"
    >
      <div>
        <Title className="titleForHowNovaPractice" level={5}>How Nova Practicing Works</Title>
        <div className="getPairedDivText">
          <div className="getPairedDivImg">
            <img className="union" src={union} alt="union" />
            <img className="getPaired" src={getPaired} alt="getPaired" />
          </div>
          <div className="titleHrDiv">
            <hr className="new1" />
            <Title className="titleForAll" level={2}>Get Paired</Title>
          </div>
          <Title className="desc" level={5}>Tell us when and what you want to pracice and we’ll pair you with an optimal peer.</Title>
        </div>
      </div>
    </Content>
  </Layout>
);
export default HowNovaWork;
