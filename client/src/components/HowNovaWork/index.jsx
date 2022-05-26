import { Layout, Typography } from 'antd';
import React from 'react';
import './style.css';
import getPaired from '../../assets/images/getPaired.png';
import practice from '../../assets/images/practice.png';
import actIt from '../../assets/images/actIt.png';

const { Content } = Layout;
const { Title } = Typography;

const HowNovaWork = () => {
  const arrImg = [{
    img: getPaired,
    title: 'Get Paired',
    desc: 'Tell us when and what you want to practice and we’ll pair you with an optimal peer.',
  }, {
    img: practice,
    title: 'Practice',
    desc: 'Interviews are conducted using a collaborative environment over video. You and your peer will interview each other for 30-40 min.',
  }, {
    img: actIt,
    title: 'Act It',
    desc: 'Learn from peers’ feedback, again confidence and master the art of interviewing. keep practicing until you interview like a rock star.',
  }];
  return (
    <Layout>
      <Content
        className="site-layout-background HowNovaWork"
      >
        <Title className="titleForHowNovaPractice" level={5}>How Nova Practicing Works</Title>
        <div className="allImg">
          {arrImg.map(({ title, img, desc }) => (
            <div className="getPairedDivText" key={title}>
              <div className="getPaired-img">
                <img className="getPaired" src={img} alt={title} />
              </div>
              <div className="titleHrDiv">
                <hr className="new1" />
                <Title className="titleForAll" level={2}>{title}</Title>
              </div>
              <Title className="desc" level={5}>{desc}</Title>
            </div>
          ))}
        </div>
      </Content>
    </Layout>
  );
};
export default HowNovaWork;
