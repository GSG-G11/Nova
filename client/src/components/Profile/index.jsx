import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ProfileTabs from '../ProfileTabs';
import UserInfo from '../UserInfo';
import Footer from '../common/Footer';

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const { user: { id: loggedInUserId } } = useSelector((state) => state.auth);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getUserData = async () => {
      try {
        setLoading(true);
        const { data: { data } } = await axios.get(`/api/user/info/${id}`, {
          cancelToken: source.token,
        });
        setUser(data);
        setSuccess(true);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    };
    getUserData();

    return () => {
      source.cancel();
    };
  }, [id]);

  return (
    <section className="profile-container">
      <UserInfo user={user} loading={loading} error={error} success={success} />
      { loggedInUserId === id && <ProfileTabs user={user} /> }
      <Footer />
    </section>
  );
};

export default Profile;
