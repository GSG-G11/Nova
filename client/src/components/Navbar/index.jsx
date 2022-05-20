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
            // must link to profile page
            <Menu.Item onClick={() => console.log(1)} className="profile">
              <UserOutlined className="icon" />
              Profile
            </Menu.Item>
          ),
        },
        {
          label: (
          // must link to logout
            <Menu.Item onClick={() => console.log(2)} className="logout">
              <LogoutOutlined className="icon" />
              Logout
            </Menu.Item>
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
            {user && (
            <Dropdown className="drop" overlay={menu} trigger={['click']} placement="bottom">
              {/* Must link profile pic to src */}
              <Avatar src="https://joeschmoe.io/api/v1/random" />
            </Dropdown>
            )}
          </div>
        </div>
      </Header>
    </Layout>
  );
};

export default Navbar;
