import React from 'react';
import { Tabs } from 'antd';
// import { useSelector } from 'react-redux';
import './style.css';

const { TabPane } = Tabs;

const ProfileTabs = () => {
  // TODO: replace the role with the user's role
  // const { user: { role } } = useSelector((state) => state.auth);
  const role = 'interviewer';
  return (
    <div>
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
          Content of Tab Pane 4
        </TabPane>
      </Tabs>
    </div>
  );
};
export default ProfileTabs;
