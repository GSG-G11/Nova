import React from 'react';
import { Radio } from 'antd';
import PropTypes from 'prop-types';
import RadioInput from '../RadioInput';

const { Group } = Radio;
const specializations = ['FRONTEND', 'SECURITY', 'BACKEND', 'DEVOPS', 'DATA STRUCTURE', 'FULL STACK'];
const StepOne = ({ title, handleChange, formData: { specialization } }) => (
  <div>
    <div className="interview-header">
      <p>{title}</p>
    </div>
    <div className="interview-step-content">
      <Group buttonStyle="outline" size="large" className="interview-form__radio-group">
        {specializations.map((option) => (
          <RadioInput name="specialization" value={specialization} handleChange={handleChange} option={option} />
        ))}
      </Group>
    </div>
  </div>
);

StepOne.propTypes = {
  title: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    specialization: PropTypes.string.isRequired,
  }).isRequired,
};

export default StepOne;
