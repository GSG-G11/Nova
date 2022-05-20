import { Layout, Button, Typography } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { } from '@ant-design/icons';
import './style.css';
import headerImg from '../../assets/images/header.png';

const { Content } = Layout;
const { Title } = Typography;

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  return (
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
              <Title level={5} className="pNova">Nova Community</Title>
            </div>
            <Title level={1} className="PracticeMakesPerfect">Practice Makes Perfect</Title>
            <Title level={5} className="pDescribe">
              More than 2 billion people in over countries use Nova to
              practice with professional interviewer.
            </Title>
            {!user ? (
              <Button className="btnStartPracticing" type="primary">
                Start Practicing
              </Button>
            )
              : (
                <Button className="btnBookInterview" type="primary">
                  Book Interview
                </Button>
              )}
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
};
export default Header;
