import React from 'react';
import { Tabs } from 'antd';
import './style.css';

const { TabPane } = Tabs;

const ProfileTabs = () => (
  <div>
    <Tabs defaultActiveKey="1" className="Tabs__section" centered>
      <TabPane tab="Upcoming interviews" key="1" defaultActiveKey className="Tab__header">
        Contents of Tab Pane 1
      </TabPane>
      <TabPane tab="Interviews history" key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab="Reviews" key="3">
        Content of Tab Pane 3
      </TabPane>
      <TabPane tab="Settings" key="4">
        Content of Tab Pane 4
      </TabPane>
    </Tabs>
  </div>
);

export default ProfileTabs;
