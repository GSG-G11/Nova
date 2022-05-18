import React from 'react';
import { Typography } from 'antd';
import SectionIntro from '../common/SectionIntro';
import circle from '../../assets/images/circle.png';
import person from '../../assets/images/person.png';
import './style.css';

const { Text } = Typography;
const ActiveMembers = () => (
  <section className="active-members">
    <SectionIntro
      action="Valuable Team"
      title="Our professionals Active Members"
      description="Start training on job interviews with professional interviewers
      specialized in all fields of programming"
    />
    <div className="active-members__members">

      <div className="active-members__member-card">
        <img
          className="active-members__circle"
          alt="circle"
          src={circle}
        />
        <div className="active-members__member-image">
          <img
            src={person}
            alt="member"
          />
        </div>
        <Text strong className="active-members__member-name"> Fahim Rahman </Text>
        <Text className="active-members__member-position"> Full Stack Developer </Text>
      </div>
      <div className="active-members__member-card">
        <img
          className="active-members__circle"
          alt="circle"
          src={circle}
        />
        <div className="active-members__member-image">
          <img
            src={person}
            alt="member"
          />
        </div>
        <Text strong className="active-members__member-name"> Fahim Rahman </Text>
        <Text className="active-members__member-position"> Full Stack Developer </Text>
      </div>
      <div className="active-members__member-card">
        <img
          className="active-members__circle"
          alt="circle"
          src={circle}
        />
        <div className="active-members__member-image">
          <img
            src={person}
            alt="member"
          />
        </div>
        <Text strong className="active-members__member-name"> Fahim Rahman </Text>
        <Text className="active-members__member-position"> Full Stack Developer </Text>
      </div>
      <div className="active-members__member-card">
        <img
          className="active-members__circle"
          alt="circle"
          src={circle}
        />
        <div className="active-members__member-image">
          <img
            src={person}
            alt="member"
          />
        </div>
        <Text strong className="active-members__member-name"> Fahim Rahman </Text>
        <Text className="active-members__member-position"> Full Stack Developer </Text>
      </div>
    </div>
  </section>
);

export default ActiveMembers;
