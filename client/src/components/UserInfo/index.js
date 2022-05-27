import React from 'react';
import './style.css';
import propTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { EditOutlined } from '@ant-design/icons';
import {
  Image, Skeleton, Typography,
} from 'antd';
import Navbar from '../Navbar';
import CreateInterviewButton from '../common/CreateInterviewButton';
import circle from '../../assets/images/parpelsvg.png';

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
              <img
                className="active-members__circle"
                alt="circle"
                src={circle}
              />
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
              <div className="edit-info">
                <EditOutlined />
              </div>
              <Title level={4} className="user__about">About me</Title>
              <hr />
              <Text className="user__about-description">
                {bio}
              </Text>
              <h4 className="user__cv">
                My resume
              </h4>
              <hr />
              <p>
                <a href={cv} download target="_blank" className="cv-a" rel="noreferrer">{cv}</a>
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
