import React, { useState, useEffect } from 'react';
import './style.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Image, message, Skeleton, Typography,
} from 'antd';
import Navbar from '../Navbar';
import CreateInterviewButton from '../common/CreateInterviewButton';
import ProfileTabs from '../ProfileTabs';

const { Text, Title } = Typography;
const UserInfo = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const { user: loggedInUser } = useSelector((state) => state.auth);

  const loggedInUserId = loggedInUser?.id;
  const loggedInUserRole = loggedInUser?.role;

  useEffect(() => {
    const source = axios.CancelToken.source();
    try {
      const getUserData = async () => {
        setLoading(true);
        const { data: { data } } = await axios.get(`/api/user/info/${id}`, {
          cancelToken: source.token,
        });
        setUser(data);
        setLoading(false);
      };
      getUserData();
    } catch ({ response: { data: { message: msg } } }) {
      message.error(msg);
    }

    return () => {
      source.cancel();
    };
  }, [id]);

  const {
    name, bio, profilePicture, level, cv,
  } = user;

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

            {loggedInUserRole === 'interviewee' && loggedInUserId === id && (
              <ProfileTabs />
            )}
          </>
        )}
      </div>
    </>

  );
};
export default UserInfo;
