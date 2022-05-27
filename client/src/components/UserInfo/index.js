import React from 'react';
import './style.css';
import propTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Button,
  Image, Result, Skeleton, Typography,
} from 'antd';
import Navbar from '../Navbar';
import CreateInterviewButton from '../common/CreateInterviewButton';
import circle from '../../assets/images/parpelsvg.png';

const { Text, Title } = Typography;

const UserInfo = ({
  user, loading, error, success,
}) => {
  const {
    name, bio, level, cv, profilePicture: userImg,
  } = user;
  const navigate = useNavigate();
  const { id } = useParams();
  const { user: loggedInUser } = useSelector((state) => state.auth);

  const loggedInUserId = loggedInUser?.id;
  const loggedInUserRole = loggedInUser?.role;
  const profilePicture = loggedInUser?.profilePicture;

  return (
    <>
      <Navbar profilePicture={profilePicture} />
      <div className="user__info-section">
        {loading ? (
          <Skeleton loading={loading} active avatar className="skeleton-userInfo" />
        ) : success && (
          <>
            <div className="user__primary">
              <img
                className="active-members__circle"
                alt="circle"
                src={circle}
              />
              <div className="user__image-container">
                <Image src={userImg} alt="profile" />
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
              <hr />
              <Text className="user__about-description">
                {bio}
              </Text>
              <h4 className="user__cv">
                My resume
              </h4>
              <hr />
              <p>
                <a href={cv} target="_blank" className="cv-a" rel="noreferrer">Link to resume</a>
              </p>
            </div>
          </>
        )}
      </div>
      {error && (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the user you are looking for does not exist."
        extra={(
          <Button onClick={() => navigate('/')} type="primary">
            Back to Home
          </Button>
        )}
      />
      )}

    </>

  );
};

UserInfo.propTypes = {
  loading: propTypes.bool.isRequired,
  error: propTypes.bool.isRequired,
  success: propTypes.bool.isRequired,
  user: propTypes.shape({
    name: propTypes.string.isRequired,
    bio: propTypes.string.isRequired,
    profilePicture: propTypes.string.isRequired,
    level: propTypes.string.isRequired,
    cv: propTypes.string.isRequired,
  }).isRequired,
};
export default UserInfo;
