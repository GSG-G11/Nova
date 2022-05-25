import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Typography } from 'antd';
import circle from '../../../assets/images/circle.png';

const { Text } = Typography;

const Member = ({
  _id, specialization, userInfo: { name, profile_picture: profilePic }, userId,
}) => {
  const navigate = useNavigate();
  return (
    <div
      key={_id}
      className="active-members__member-card"
      onClick={() => navigate(`/users/${userId}`)}
      aria-hidden
    >
      <img
        className="active-members__circle"
        alt="circle"
        src={circle}
      />
      <div className="active-members__member-image">
        <img
          src={profilePic}
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
        {specialization}
        {' '}
      </Text>
    </div>
  );
};

Member.propTypes = {
  _id: PropTypes.string.isRequired,
  userInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    profile_picture: PropTypes.string.isRequired,
  }).isRequired,
  specialization: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};
export default Member;
