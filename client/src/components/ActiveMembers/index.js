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
        const { data: { data } } = await axios.get('/api/users?role=interviewer&limit=4', {
          cancelToken: cancelToken.token,
        });
        console.log(data);
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

        {members.map(({
          _id, name, role, image,
        }) => (
          <Member
            key={_id}
            _id={_id}
            name={name}
            interviewer={role}
            image={image}
          />
        ))}

      </div>
    </section>

  );
};
export default ActiveMembers;
