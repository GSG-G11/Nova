import {
  Layout, Menu, Avatar, Dropdown,
} from 'antd';
import {
  LogoutOutlined, UserOutlined,
} from '@ant-design/icons';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './style.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/images/logo.png';
import { LoginButton, SignupButton } from '../Forms';
import { setUser } from '../../redux/features/auth/authSlice';

const { Header } = Layout;
const { Item } = Menu;
const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menu = (
    <Menu
      items={[
        {
          label: (
            <Link to={user ? (`/users/${user.id}`) : '/'}>
              <Item className="profile">
                <UserOutlined className="icon" />
                Profile
              </Item>
            </Link>
          ),
        },
        {
          label: (

            <Item
              onClick={async () => {
                await axios.post('/api/logout');
                dispatch(setUser({ isAuthenticated: false, user: null }));
                navigate('/');
              }}
              className="logout"
            >
              <LogoutOutlined className="icon" />
              Logout
            </Item>
          ),
        },
      ]}
    />
  );
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
                <Item className="btn" ant-click-animating-without-extra-node="false">
                  Home
                </Item>
                <Item className="btn">
                  Team
                </Item>
                <Item className="btn">
                  Challenge
                </Item>
                <Item className="btn">
                  About
                </Item>
              </div>
            </Menu>
          </div>

          <div className="left">
            {!user ? (
              <div>
                <SignupButton />
                <LoginButton />
              </div>
            ) : (
              <Dropdown className="drop" overlay={menu} trigger={['click']} placement="bottom">
                <Avatar src={user.profilePicture} />
              </Dropdown>
            )}
          </div>
        </div>
      </Header>
    </Layout>
  );
};

export default Navbar;
