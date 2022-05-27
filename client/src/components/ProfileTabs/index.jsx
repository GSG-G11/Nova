import React from 'react';
import { Tabs } from 'antd';
import {
  SettingOutlined, CommentOutlined, CalendarOutlined, ProfileOutlined, HistoryOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ReviewCard from '../Review';
import SettingTab from '../Setting';
import './style.css';
import CalenderTab from '../Calender';
import UpcomingAndHistoryInterviews from '../UpcomingAndHistoryInterviews/UpcomingAndHistoryInterviews';
// <HistoryOutlined />
const { TabPane } = Tabs;

const ProfileTabs = ({ user: userInfo }) => {
  const { user } = useSelector((state) => state.auth);
  const { role } = user;
  return (
    role && (
    <div className="profile-tabs-holder">
      <Tabs defaultActiveKey="1" className="Tabs__section" centered>
        <TabPane
          key="1"
          defaultActiveKey
          className="Tab__header"
          tab={(
            <span>
              <ProfileOutlined />
              Upcoming interviews
            </span>
      )}
        >
          <UpcomingAndHistoryInterviews status="upcoming" />
        </TabPane>
        <TabPane
          key="2"
          className="Tab__header"
          tab={(
            <span>
              <HistoryOutlined />
              Interviews history
            </span>
      )}
        >
          <UpcomingAndHistoryInterviews status="history" />
        </TabPane>
        {role === 'interviewee' ? (
          <TabPane
            key="3"
            tab={(
              <span>
                <CommentOutlined />
                Reviews
              </span>
          )}
          >
            <ReviewCard />
          </TabPane>

        ) : (
          <TabPane
            tab={(
              <span>
                <CalendarOutlined />
                Schedule
              </span>
        )}
            key="3"
          >
            <CalenderTab />
          </TabPane>
        )}
        <TabPane
          tab={(
            <span>
              <SettingOutlined />
              Settings
            </span>
      )}
          key="4"
        >
          <SettingTab user={userInfo} />
        </TabPane>
      </Tabs>
    </div>
    )
  );
};
ProfileTabs.propTypes = {
  user: PropTypes.shape({
    bio: PropTypes.string.isRequired,
    profilePicture: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    cv: PropTypes.string.isRequired,
  }).isRequired,
};
export default ProfileTabs;
