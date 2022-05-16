import React from 'react';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { Typography } from 'antd';
import PropTypes from 'prop-types';
import LoadingSpinner from '../../../common/LoadingSpinner';

const { Title, Text } = Typography;
const StepFive = ({ title, loading }) => {
  if (loading) {
    return (
      <div className="step__five-success">
        <p>Please wait while we find you a match</p>
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div>
      <div className="interview-header">
        <p>{title}</p>
      </div>
      <div className="interview-step-content">
        <div className="interview-form__radio-group-fifth">
          <div className="interview-form__radio-group-fifth-check">
            <Title level={1}>You have been matched!</Title>
            <CheckCircleTwoTone
              twoToneColor="#52c41a"
              className="interview-form__radio-group-fifth-check-icon"
            />
            <Title>
              You Successfully booked an interview.
            </Title>
            <Text>
              You will receive an email with the details of your interview.
            </Text>
          </div>
        </div>

      </div>
    </div>
  );
};

StepFive.propTypes = {
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default StepFive;
