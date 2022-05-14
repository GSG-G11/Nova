import React, { useState, useEffect } from 'react';
import './style.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../common/LoadingSpinner';

const UserInfo = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const { user: loggedInUser } = useSelector((state) => state.auth);

  const loggedInUserId = loggedInUser?.id;
  const loggedInUserRole = loggedInUser?.role;

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const getUserData = async () => {
      setLoading(true);
      const { data: { data } } = await axios.get(`/api/user/info/${id}`, { signal });
      setUser(data);
      setLoading(false);
    };
    getUserData();

    return () => {
      controller.abort();
    };
  }, [id]);

  const { name, bio, profilePicture } = user;

  return (
    <div className="user__info-section">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="user__primary">
            <div className="user__image-container">
              <img src={profilePicture} alt="" />
            </div>
            <div className="user__primary-info">
              <p className="user__name">{name}</p>
              {loggedInUserRole === 'interviewee' && loggedInUserId === id && (
              <button type="button" className="user__start-interview">
                Start a Practice Interview
              </button>
              )}
            </div>
          </div>

          <div className="user__secondary-info">
            <p className="user__about">About me</p>
            <p className="user__about-description">
              {bio}
            </p>
          </div>
        </>
      )}
    </div>

  );
};
export default UserInfo;
