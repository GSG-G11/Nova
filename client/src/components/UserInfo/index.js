import React, { useState, useEffect } from 'react';
import './style.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Button, Image, message, Skeleton, Typography,
} from 'antd';
import InterviewForm from '../Forms/Interview/InterviewForm';
import Navbar from '../Navbar';

const { Text, Title } = Typography;
const UserInfo = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
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
    <div className="user__info-section">
      <Navbar />
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
                <>
                  <InterviewForm
                    setVisible={setVisible}
                    visible={visible}
                  />
                  <Button
                    type="primary"
                    className="user__start-interview"
                    onClick={() => setVisible(true)}
                  >
                    Start a Practice Interview
                  </Button>
                </>
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

  );
};
export default UserInfo;
