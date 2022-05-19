import { Layout, Menu, Button } from 'antd';
import React from 'react';
import './style.css';
import logo from '../../assets/images/logo.png';
import { LoginButton, SignupButton } from '../Forms';

const { Header } = Layout;

const Navbar = () => (
  <Layout className="layout navbar">
    <Header className="head">
      <div className="right-left">
        <div className="right">
          <div className="logo">
            <img src={logo} alt="logo" className="logo-img" />
          </div>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={['1']}
          >
            <div className="allBtn">
              <Button className="btn" ant-click-animating-without-extra-node="false">
                Home
              </Button>
              <Button className="btn">
                Team
              </Button>
              <Button className="btn">
                Challenge
              </Button>
              <Button className="btn">
                About
              </Button>
            </div>
          </Menu>
        </div>

        <div className="left">
          <SignupButton />
          <LoginButton />
        </div>
      </div>
    </Header>
  </Layout>
);

export default Navbar;
