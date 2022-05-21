import { Layout, Typography } from 'antd';
import React from 'react';
import './style.css';
import getPaired from '../../assets/images/Image.png';
import practice from '../../assets/images/pexels-cottonbro-6140202.png';
import actIt from '../../assets/images/pexels-pixabay-163064.png';

const { Content } = Layout;
const { Title } = Typography;

const HowNovaWork = () => (
  <Layout>
    <Content
      className="site-layout-background HowNovaWork"
    >
      <Title className="titleForHowNovaPractice" level={5}>How Nova Practicing Works</Title>
      <div className="allImg">
        <div className="getPairedDivText">
          <img className="getPaired" src={getPaired} alt="getPaired" />
          <div className="titleHrDiv">
            <hr className="new1" />
            <Title className="titleForAll" level={2}>Get Paired</Title>
          </div>
          <Title className="desc" level={5}>Tell us when and what you want to pracice and we’ll pair you with an optimal peer.</Title>
        </div>
        <div className="getPairedDivText">
          <img className="getPaired" src={practice} alt="practice" />
          <div className="titleHrDiv">
            <hr className="new1" />
            <Title className="titleForAll" level={2}>Practice</Title>
          </div>
          <Title className="desc" level={5}>Interviews are conducted using a collaborative environment over video. You and your peer will interview each other for 30-40 min.</Title>
        </div>
        <div className="getPairedDivText">
          <img className="getPaired" src={actIt} alt="actIt" />
          <div className="titleHrDiv">
            <hr className="new1" />
            <Title className="titleForAll" level={2}>Act it</Title>
          </div>
          <Title className="desc" level={5}>Learn from peers’ feedback, again confidence and master the art of interviewing. keep practicing until you interview like a rock star.</Title>
        </div>
      </div>
    </Content>
  </Layout>
);
export default HowNovaWork;
