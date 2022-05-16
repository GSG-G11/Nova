/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Radio } from 'antd';
import RadioInput from '../RadioInput';

const questionCategories = ['Technical', 'Analytical', 'Algorithms', 'System Design'];
const { Group } = Radio;
// eslint-disable-next-line react/prop-types
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

export default StepThree;
