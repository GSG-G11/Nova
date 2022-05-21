import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Typography } from 'antd';
import circle from '../../../assets/images/circle.png';

const { Text } = Typography;

const Member = ({
  _id, name, interviewer, image,
}) => {
  const navigate = useNavigate();

  return (
    <div
      key={_id}
      className="active-members__member-card"
      onClick={() => navigate(`/users/${_id}`)}
      aria-hidden
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
  );
};

Member.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  interviewer: PropTypes.arrayOf(PropTypes.shape({
    specialization: PropTypes.string.isRequired,
  })).isRequired,
  image: PropTypes.string.isRequired,
};
export default Member;
