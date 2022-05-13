import React, { useState, useEffect } from 'react';
import './UserInfo.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import LoadingSpinner from '../common/LoadingSpinner/LoadingSpinner';

const UserInfo = () => {
  // TODO: get id from redux state
  const { user: { id, role } } = useSelector((state) => state.auth);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  // TODO: useEffect to fetch user info when the function is ready

  useEffect(() => {
    if (id) {
      axios.get(`/api/user/info/${id}`).then((res) => {
        setUser(res.data.data);
        setLoading(false);
      });
    }
  }, [id]);

  const { name, bio, profilePicture } = user;

  // TODO: Replace with user info from redux state
  return (
    <div className="user__info-section">
      {loading ? (
        <LoadingSpinner />
      ) : (
        user && (
          <>
            <div className="user__primary">
              <div className="user__image-container">
                <img src={profilePicture} alt="" />
              </div>
              <div className="user__primary-info">
                <p className="user__name">{name}</p>
                {role === 'interviewee' && (
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
        )
      )}
    </div>

  );
};
export default UserInfo;
