import {
  Layout, Menu, Avatar, Dropdown, message,
} from 'antd';
import {
  LogoutOutlined, UserOutlined,
} from '@ant-design/icons';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/images/logo-removebg-preview.png';
import { LoginButton, SignupButton } from '../Forms';
import { clearUser } from '../../redux/features/auth/authSlice';

const { Header } = Layout;
const { Item } = Menu;
const Navbar = ({ profilePicture }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = async () => {
    await axios.post('/api/logout');
    dispatch(clearUser());
    message.success('Logged out successfully');
    navigate('/');
  };

  window.addEventListener('scroll', () => {
    const header = document.querySelector('.head');
    header.classList.toggle('sticky', window.scrollY > 0);
  });

  let role;
  if (user) {
    role = user.role;
  }
  let path;

  if (role === 'admin') {
    path = '/admin';
  } else if (role === 'interviewer' || role === 'interviewee') {
    path = `/users/${user.id}`;
  } else {
    path = '/';
  }

  const menu = (
    <Menu
      items={[
        {
          label: (
            <Link to={path}>
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
              onClick={() => logout()}
              className="profile"
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
              <Link to="/">
                <img src={logo} alt="logo" className="logo-img" />
              </Link>
            </div>
            <Menu
              mode="horizontal"
              defaultSelectedKeys={['1']}
            >
              <div className="allBtn">
                <Link to="/" className="btn" ant-click-animating-without-extra-node="false">
                  Home
                </Link>
                <Link to="/#team" className="btn">
                  Team
                </Link>
                <Link to="/#challenge" className="btn">
                  Challenges
                </Link>
                <Link to="/#resources" className="btn">
                  Resources
                </Link>
              </div>
            </Menu>
          </div>

          <div className="left">
            {!user ? (
              <div>
                <SignupButton />
                <LoginButton title="Login" />
              </div>
            ) : (
              <Dropdown className="drop" overlay={menu} trigger={['click']} placement="bottom">
                <Avatar src={profilePicture} size="large" style={{ width: '45px', height: '45px' }} />
              </Dropdown>
            )}
          </div>
        </div>
      </Header>
    </Layout>
  );
};

Navbar.propTypes = {
  profilePicture: PropTypes.string.isRequired,
};

export default Navbar;
