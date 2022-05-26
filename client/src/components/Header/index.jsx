import { Button, Layout, Typography } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import './style.css';
import { Link } from 'react-router-dom';
import headerImg from '../../assets/images/header.png';
import CreateInterviewButton from '../common/CreateInterviewButton';
import { LoginButton } from '../Forms';

const { Content } = Layout;
const { Title } = Typography;

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <Content
        className="site-layout-background headerContent"
      >
        <div className="allSec" id="home">
          <section className="rightSec">
            <div className="novaCommunity">
              <Title level={5} className="pNova">Nova Community</Title>
            </div>
            <Title level={2} className="PracticeMakesPerfect">Practice Makes Perfect</Title>
            <Title level={5} className="pDescribe">
              More than 2 billion people in over countries use Nova to
              practice with professional interviewer.
            </Title>
            {!user ? (
              <LoginButton title="Start Practicing" className="btnStartPracticing" />
            )
              : (
                <CreateInterviewButton
                  title="Book an Interview"
                />

              )}
            <Button className="btnAboutOurTeam">
              <Link to="/#team">
                About Our Team
              </Link>
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
