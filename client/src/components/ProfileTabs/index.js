import React from 'react';
import { Tabs } from 'antd';
import { useSelector } from 'react-redux';
import SettingTab from '../Setting/Setting';
import './style.css';

const { TabPane } = Tabs;

const ProfileTabs = () => {
  const { user } = useSelector((state) => state.auth);
  const role = user?.role;
  return (
    role && (
    <div className="profile-tabs-holder">
      <Tabs defaultActiveKey="1" className="Tabs__section" centered>
        <TabPane tab="Upcoming interviews" key="1" defaultActiveKey className="Tab__header">
          Contents of Tab Pane 1
        </TabPane>
        <TabPane tab="Interviews history" key="2">
          Content of Tab Pane 2
        </TabPane>
        {role === 'interviewee' ? (
          <TabPane tab="Reviews" key="3">
            Content of Tab Pane 3
          </TabPane>

        ) : (
          <TabPane tab="Schedule" key="3">
            Content of Tab Pane 3
          </TabPane>
        )}
        <TabPane tab="Settings" key="4">
          <SettingTab />
        </TabPane>
      </Tabs>
    </div>
    )
  );
};
export default ProfileTabs;
