import {
  BookOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState, createElement } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { clearUser } from '../../redux/features/auth/authSlice';
import AdminTables from '../AdminTables';
import whiteLogo from '../../assets/images/whiteLogo.png';

const {
  Header, Content, Footer, Sider,
} = Layout;

const items = [
  {
    key: '1',
    icon: UserOutlined,
    label: 'Interviewers',
    content: <AdminTables pageLocation="Interviewers" roles="interviewer" />,
  },
  {
    key: '2',
    icon: TeamOutlined,
    label: 'Interviewees',
    content: <AdminTables pageLocation="Interviewees" roles="interviewee" />,
  },
  {
    key: '3',
    icon: BookOutlined,
    label: 'Applications',
    content: <AdminTables pageLocation="Applications" roles="interviewer" />,
  },
  {
    key: '4',
    icon: LogoutOutlined,
    label: 'Logout',
    logout: async () => {
      await axios.post('/api/logout');
    },
  },
];

const tabs = items.map(({
  key, icon, label, content,
}) => ({
  key,
  icon: createElement(icon),
  label,
  content,
}));
const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [content, setContent] = useState(tabs[0].content);
  const [selectedTab, setSelectedTab] = useState(tabs[0].key);

  const handleClick = (e) => {
    const { key } = e;
    setSelectedTab(key);
    if (key === '4') {
      dispatch(clearUser());
      navigate('/');
      items[3].logout();
    }
    setContent(tabs.find((tab) => tab.key === key).content);
  };
  return (
    <Layout hasSider>
      <Sider
        className="dashboard__sider"
      >
        <div className="logo" />
        <Header className="dashboard__header">
          <a href="/">
            <img src={whiteLogo} className="dashboard__img" alt="dashboard-logo" />
          </a>
        </Header>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[selectedTab]}
          items={tabs}
          onClick={handleClick}
        />
      </Sider>
      <Layout
        className="site-layout tableAdmin"
      >
        <Header
          className="site-layout-background"
        />
        <Content
          className="dashboard__content"
        >
          <div
            className="dashboard__layout"
          >
            {content}
          </div>
        </Content>
        <Footer
          className="dashboard__footer"
        >
          Nova ©2022 Created by Nova Team
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
