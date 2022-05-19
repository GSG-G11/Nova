import {
  Layout, Menu, Button, Avatar, Dropdown,
} from 'antd';
import {
  LogoutOutlined, UserOutlined,
} from '@ant-design/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import './style.css';
import logo from '../../assets/images/logo.png';
import { LoginButton, SignupButton } from '../Forms';

const { Header } = Layout;

const Navbar = () => {
  const menu = (
    <Menu
      items={[
        {
          label: (
            <Button className="btn">
              <UserOutlined />
              Profile
            </Button>
          ),
        },
        {
          label: (
            <Button className="btn">
              <LogoutOutlined />
              Logout
            </Button>
          ),
        },
      ]}
    />
  );
  const { user } = useSelector((state) => state.auth);
  return (
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
            {!user && <SignupButton />}
            {!user && <LoginButton />}
            <Dropdown overlay={menu} placement="bottom">
              <Avatar src="https://joeschmoe.io/api/v1/random" />
            </Dropdown>
          </div>
        </div>
      </Header>
    </Layout>
  );
};

export default Navbar;
