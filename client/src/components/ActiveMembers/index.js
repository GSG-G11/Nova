import React, { useState, useEffect } from 'react';
import { message, Typography } from 'antd';
import axios from 'axios';
import SectionIntro from '../common/SectionIntro';
import circle from '../../assets/images/circle.png';
import './style.css';

const { Text } = Typography;
const ActiveMembers = () => {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    const getMembers = async () => {
      try {
        const { data: { data } } = await axios.get('/api/users?role=interviewer&limit=4', {
          cancelToken: cancelToken.token,
        });
        setMembers(data);
      } catch ({ response: { data: msg } }) {
        if (axios.isCancel(msg)) {
          console.log('Request canceled', msg);
        }
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
          _id, name, interviewer, image,
        }) => (
          <div
            key={_id}
            className="active-members__member-card"
          >
            <img
              className="active-members__circle"
              alt="circle"
              src={circle}
            />
            <div className="active-members__member-image">
              <img
                src={image}
                alt="member"
              />
            </div>
            <Text strong className="active-members__member-name">
              {' '}
              {name}
              {' '}
            </Text>
            <Text className="active-members__member-position">
              {' '}
              {interviewer[0].specialization}
              {' '}
            </Text>
          </div>
        ))}

      </div>
    </section>

  );
};
export default ActiveMembers;
