import React from 'react';
import { Tabs } from 'antd';
import './ProfileTabs.css';

const ProfileTabs = () => (
  <div>
    <Tabs defaultActiveKey="1" className="Tabs__section" centered>
      <Tabs.TabPane tab="Upcoming interviews" key="1" defaultActiveKey className="Tab__header">
        Contents of Tab Pane 1
      </Tabs.TabPane>
      <Tabs.TabPane tab="Reviews" key="2">
        Content of Tab Pane 2
      </Tabs.TabPane>
      <Tabs.TabPane tab="Settings" key="3">
        Content of Tab Pane 3
      </Tabs.TabPane>
      <Tabs.TabPane tab="Interviews history" key="4">
        Content of Tab Pane 4
      </Tabs.TabPane>
    </Tabs>
  </div>
);

export default ProfileTabs;
