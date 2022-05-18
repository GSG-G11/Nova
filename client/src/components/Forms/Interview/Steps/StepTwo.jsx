import React from 'react';
import { Radio } from 'antd';
import PropTypes from 'prop-types';
import RadioInput from '../RadioInput';

const { Group } = Radio;
const languages = ['JAVASCRIPT', 'PHP', 'C++', 'RUBY', 'C#', 'JAVA', 'C', 'GO', 'PYTHON'];
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

StepTwo.propTypes = {
  title: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    language: PropTypes.string.isRequired,
  }).isRequired,
};

export default StepTwo;
