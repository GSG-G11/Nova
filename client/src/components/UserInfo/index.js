import React, { useState, useEffect } from 'react';
import './style.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Image, Result, Skeleton, Typography,
} from 'antd';
import Navbar from '../Navbar';
import CreateInterviewButton from '../common/CreateInterviewButton';
import ProfileTabs from '../ProfileTabs';

const { Text, Title } = Typography;
const UserInfo = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const { user: loggedInUser } = useSelector((state) => state.auth);

  const loggedInUserId = loggedInUser?.id;
  const loggedInUserRole = loggedInUser?.role;

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getUserData = async () => {
      try {
        setLoading(true);
        const { data: { data } } = await axios.get(`/api/user/info/${id}`, {
          cancelToken: source.token,
        });
        setUser(data);
        setLoading(false);
        setSuccess(true);
      } catch (err) {
        setLoading(false);
        setError(true);
        setSuccess(false);
      }
    };
    getUserData();

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
        )
          : success && (
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
        {error && (
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the user you are looking for does not exist."
          extra={(
            <Button type="primary" href="/">
              Back Home
            </Button>
          )}
        />
        )}

      </div>
    </>

  );
};
export default UserInfo;
