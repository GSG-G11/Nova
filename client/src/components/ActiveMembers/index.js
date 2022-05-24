import React, { useState, useEffect } from 'react';
import { message, Skeleton } from 'antd';
import axios from 'axios';
import SectionIntro from '../common/SectionIntro';
import './style.css';
import Member from './Member';

const ActiveMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    const getMembers = async () => {
      try {
        setLoading(true);
        const { data: { data } } = await axios.get('/api/interviewers', {
          cancelToken: cancelToken.token,
        });
        setMembers(data);
        setLoading(false);
      } catch ({ response: { data: msg } }) {
        message.error(msg);
        setLoading(false);
      }
    };
    getMembers();

    return () => {
      cancelToken.cancel();
    };
  }, []);
  return (
    <section className="active-members">
      <SectionIntro
        action="Valuable Team"
        title="Our professionals Active Members"
        description="Start training on job interviews with professional interviewers
      specialized in all fields of programming"
      />
      <div className="active-members__members">

        {loading && (
          <>
            <Skeleton loading={loading} active avatar />
            <Skeleton loading={loading} active avatar />
            <Skeleton loading={loading} active avatar />
            <Skeleton loading={loading} active avatar />
          </>
        )}
        {
      members.length && members.map(({
        _id, userInfo, specialization, userId,
      }) => (
        <Member
          key={_id}
          _id={_id}
          userInfo={userInfo[0]}
          specialization={specialization}
          userId={userId}
        />
      ))

    }

      </div>
    </section>

  );
};
export default ActiveMembers;
