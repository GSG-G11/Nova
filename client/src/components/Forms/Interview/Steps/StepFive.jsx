/* eslint-disable react/prop-types */
import React from 'react';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { Typography } from 'antd';
import LoadingSpinner from '../../../common/LoadingSpinner';

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
            <CheckCircleTwoTone
              twoToneColor="#52c41a"
              className="interview-form__radio-group-fifth-check-icon"
            />
            <Typography.Title>
              You have successfully booked an interview.
            </Typography.Title>
            <Typography.Text>
              You will receive an email with the details of your interview.
            </Typography.Text>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StepFive;
