import React, { useState, useEffect } from 'react';
import './style.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Image, message } from 'antd';
import LoadingSpinner from '../common/LoadingSpinner';

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
    } catch (error) {
      message.error(error);
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
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="user__primary">
            <div className="user__image-container">
              <Image src={profilePicture} alt="profile" className="user__image" />
            </div>
            <div className="user__primary-info">
              <p className="user__name">{name}</p>
              <p className="user__level">
                Experience:
                {' '}
                <strong>{level}</strong>
              </p>

              {loggedInUserRole === 'interviewee' && loggedInUserId === id && (
              <Button type="primary" className="user__start-interview">
                Start a Practice Interview
              </Button>
              )}
            </div>
          </div>

          <div className="user__secondary-info">
            <p className="user__about">About me</p>
            <p className="user__about-description">
              {bio}
            </p>
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
