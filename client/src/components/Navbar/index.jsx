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
import logo from '../../assets/images/logo-removebg-preview.png';
import { LoginButton, SignupButton } from '../Forms';
import { clearUser } from '../../redux/features/auth/authSlice';

const { Header } = Layout;
const { Item } = Menu;
const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = async () => {
    await axios.post('/api/logout');
    dispatch(clearUser());
    navigate('/');
  };
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
              onClick={() => logout()}
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
                <Avatar src={user.profilePicture} size="large" style={{ width: '45px', height: '45px' }} />
              </Dropdown>
            )}
          </div>
        </div>
      </Header>
    </Layout>
  );
};

export default Navbar;
