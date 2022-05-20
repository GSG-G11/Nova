import { Layout, Button } from 'antd';
import React from 'react';
import { } from '@ant-design/icons';
import './style.css';
import headerImg from '../../assets/images/header.png';

const { Content } = Layout;

const Header = () => (
  <Layout>
    <Content
      className="site-layout-background headerContent"
      style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
      }}
    >
      <div className="allSec">
        <section className="rightSec">
          <div className="novaCommunity">
            <p className="pNova">Nova Community</p>
          </div>
          <h1 className="PracticeMakesPerfect">Practice Makes Perfect</h1>
          <p className="pDescribe">
            More than 2 billion people in over countries use Nova to
            practice with professional interviewer.
          </p>
          <Button className="btnStartPracticing" type="primary">
            Start Practicing
          </Button>
          <Button className="btnAboutOurTeam" type="primary">
            About our Team
          </Button>
        </section>
        <section className="leftSec">
          <img className="headerImg" src={headerImg} alt="header" />
        </section>
      </div>
    </Content>
  </Layout>
);

export default Header;
