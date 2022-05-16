/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Radio } from 'antd';
import RadioInput from '../RadioInput';

const { Group } = Radio;
const languages = ['JS', 'PHP', 'C++', 'RUBY', 'C#', 'JAVA', 'C', 'GO', 'PYTHON'];
// eslint-disable-next-line react/prop-types
const StepTwo = ({ title, handleChange, formData: { language } }) => (
  <div>
    <div className="interview-header">
      <p>{title}</p>
    </div>
    <div className="interview-step-content">
      <Group buttonStyle="outline" size="large" className="interview-form__radio-group-second">

        {languages.map((option) => (
          <RadioInput
            key={option}
            name="language"
            value={language}
            handleChange={handleChange}
            option={option}
          />
        ))}
      </Group>
    </div>
  </div>
);

export default StepTwo;
