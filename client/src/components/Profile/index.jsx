import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';
import { useSelector } from 'react-redux';
import ProfileTabs from '../ProfileTabs';
import UserInfo from '../UserInfo';
import Footer from '../common/Footer';

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const { user: { id: loggedInUserId } } = useSelector((state) => state.auth);

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

  return (
    <section className="profile-container">
      <UserInfo user={user} loading={loading} />
      { loggedInUserId === id && <ProfileTabs user={user} /> }
      <Footer />
    </section>
  );
};

export default Profile;
