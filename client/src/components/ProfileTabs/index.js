import React from 'react';
import { Tabs } from 'antd';
import { useSelector } from 'react-redux';
import './style.css';
import UpcomingInterviews from '../UpcomingInterviews/UpcomingInterviews';

const { TabPane } = Tabs;

const ProfileTabs = () => {
  const { user } = useSelector((state) => state.auth);
  const { role } = user.data;
  return (
    role && (
    <div>
      <Tabs defaultActiveKey="1" className="Tabs__section" centered>
        <TabPane tab="Upcoming interviews" key="1" defaultActiveKey className="Tab__header">
          <UpcomingInterviews status="upcoming" />
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
          Content of Tab Pane 4
        </TabPane>
      </Tabs>
    </div>
    )
  );
};
export default ProfileTabs;
