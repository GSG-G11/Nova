import React from 'react';
import { Radio } from 'antd';
import PropTypes from 'prop-types';
import RadioInput from '../RadioInput';

const questionCategories = ['Technical', 'Analytical', 'Algorithms', 'System Design'];
const { Group } = Radio;
const StepThree = ({ title, handleChange, formData: { questionCategory } }) => (
  <div>
    <div className="interview-header">
      <p>{title}</p>
    </div>
    <div className="interview-step-content">
      <Group buttonStyle="outline" size="large" className="interview-form__radio-group-third">
        {questionCategories.map((option) => (
          <RadioInput
            key={option}
            name="questionCategory"
            value={questionCategory}
            handleChange={handleChange}
            option={option}

          />
        ))}
      </Group>
    </div>

  </div>
);

StepThree.propTypes = {
  title: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    questionCategory: PropTypes.string.isRequired,
  }).isRequired,
};
export default StepThree;
