import { Layout, Button, Typography } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { } from '@ant-design/icons';
import './style.css';
import headerImg from '../../assets/images/header.png';
import InterviewForm from '../Forms/Interview/InterviewForm';

const { Content } = Layout;
const { Title } = Typography;

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const [visible, setVisible] = React.useState(false);
  return (
    <Layout>
      <Content
        className="site-layout-background headerContent"
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
                <>
                  <InterviewForm
                    setVisible={setVisible}
                    visible={visible}
                  />
                  <Button
                    type="primary"
                    className="btnStartPracticing"
                    onClick={() => setVisible(true)}
                  >
                    Book an Interview
                  </Button>
                </>
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
