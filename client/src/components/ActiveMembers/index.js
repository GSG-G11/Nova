import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import axios from 'axios';
import SectionIntro from '../common/SectionIntro';
import './style.css';
import Member from './Member';

const ActiveMembers = () => {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    const getMembers = async () => {
      try {
        const { data: { data } } = await axios.get('/api/interviewers', {
          cancelToken: cancelToken.token,
        });
        setMembers(data);
      } catch ({ response: { data: msg } }) {
        message.error(msg);
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

        {members.length && members.map(({
          _id, userInfo, specialization,
        }) => (
          <Member
            key={_id}
            _id={_id}
            userInfo={userInfo[0]}
            specialization={specialization}
          />
        ))}

      </div>
    </section>

  );
};
export default ActiveMembers;
