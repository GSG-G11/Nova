import React from 'react';
import './style.css';
import propTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Image, Skeleton, Typography,
} from 'antd';
import Navbar from '../Navbar';
import CreateInterviewButton from '../common/CreateInterviewButton';

const { Text, Title } = Typography;

const UserInfo = ({ user, loading }) => {
  const {
    name, bio, profilePicture, level, cv,
  } = user;
  const { id } = useParams();
  const { user: loggedInUser } = useSelector((state) => state.auth);

  const loggedInUserId = loggedInUser?.id;
  const loggedInUserRole = loggedInUser?.role;

  return (
    <>
      <Navbar />
      <div className="user__info-section">
        {loading ? (
          <Skeleton loading={loading} active avatar className="skeleton-userInfo" />
        ) : (
          <>
            <div className="user__primary">
              <div className="user__image-container">
                <Image src={profilePicture} alt="profile" />
              </div>
              <div className="user__primary-info">
                <Title level={2} className="user__name">{name}</Title>
                <Text className="user__level">{level}</Text>
                {loggedInUserRole === 'interviewee' && loggedInUserId === id && (
                <CreateInterviewButton title="Start a Practice Interview" />
                )}
              </div>
            </div>

            <div className="user__secondary-info">
              <Title level={4} className="user__about">About me</Title>
              <Text className="user__about-description">
                {bio}
              </Text>
              <p className="user__cv">
                Link to CV:
                {' '}
                <a href={cv} download target="_blank" rel="noreferrer">{cv}</a>
              </p>

            </div>
          </>
        )}
      </div>
    </>

  );
};

UserInfo.propTypes = {
  loading: propTypes.bool.isRequired,
  user: propTypes.shape({
    name: propTypes.string.isRequired,
    bio: propTypes.string.isRequired,
    profilePicture: propTypes.string.isRequired,
    level: propTypes.string.isRequired,
    cv: propTypes.string.isRequired,
  }).isRequired,
};
export default UserInfo;
