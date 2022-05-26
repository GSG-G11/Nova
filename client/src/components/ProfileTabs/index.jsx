import React from 'react';
import { Tabs } from 'antd';
import { useSelector } from 'react-redux';
import ReviewCard from '../Review';
import SettingTab from '../Setting';
import './style.css';
import CalenderTab from '../Calender';
import UpcomingAndHistoryInterviews from '../UpcomingAndHistoryInterviews/UpcomingAndHistoryInterviews';

const { TabPane } = Tabs;

const ProfileTabs = () => {
  const { user } = useSelector((state) => state.auth);
  const { role } = user;
  return (
    role && (
    <div className="profile-tabs-holder">
      <Tabs defaultActiveKey="1" className="Tabs__section" centered>
        <TabPane tab="Upcoming interviews" key="1" defaultActiveKey className="Tab__header">
          <UpcomingAndHistoryInterviews status="upcoming" />
        </TabPane>
        <TabPane tab="Interviews history" key="2" className="Tab__header">
          <UpcomingAndHistoryInterviews status="history" />
        </TabPane>
        {role === 'interviewee' ? (
          <TabPane tab="Reviews" key="3">
            <ReviewCard />
          </TabPane>

        ) : (
          <TabPane tab="Schedule" key="3">
            <CalenderTab />
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
