import {
  BookOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Typography } from 'antd';
import React, { useState, createElement } from 'react';
import './style.css';

const {
  Header, Content, Footer, Sider,
} = Layout;

const { Title } = Typography;
const items = [
  {
    key: '1',
    icon: UserOutlined,
    label: 'Interviewers',
    content: <div>Interviewers</div>,
  },
  {
    key: '2',
    icon: TeamOutlined,
    label: 'Interviewees',
    content: <div>Interviewees</div>,
  },
  {
    key: '3',
    icon: BookOutlined,
    label: 'Applications',
    content: <div>Applications</div>,
  },
  {
    key: '4',
    icon: LogoutOutlined,
    label: 'Logout',
    content: <div>Logout</div>,
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
  const [content, setContent] = useState(tabs[0].content);
  const [selectedTab, setSelectedTab] = useState(tabs[0].key);

  const handleClick = (e) => {
    const { key } = e;
    setSelectedTab(key);
    setContent(tabs.find((tab) => tab.key === key).content);
  };
  return (
    <Layout hasSider>
      <Sider
        className="dashboard__sider"
      >
        <div className="logo" />
        <Header className="dashboard__header">
          <Title level={4} className="dashboard__title">Admin Dashboard</Title>
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
        className="site-layout"
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