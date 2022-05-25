import React from 'react';
import { Radio } from 'antd';
import PropTypes from 'prop-types';
import RadioInput from '../RadioInput';

const { Group } = Radio;
const questionCategories = ['Technical', 'Analytical', 'Algorithms', 'System Design'];
const languages = ['JAVASCRIPT', 'PHP', 'C++', 'RUBY', 'C#', 'JAVA', 'C', 'GO', 'PYTHON'];
const specializations = ['FRONTEND', 'SECURITY', 'BACKEND', 'DEVOPS', 'DATA STRUCTURE', 'FULL STACK'];
const Step = ({ title, handleChange, formData }) => {
  let arr = [];
  let data;
  let name;

  if (title === 'Specialization') {
    arr = [...specializations];
    data = formData.specialization;
    name = 'specialization';
  } else if (title === 'Language') {
    arr = [...languages];
    data = formData.language;
    name = 'language';
  } else {
    arr = [...questionCategories];
    data = formData.questionCategory;
    name = 'questionCategory';
  }

  return (
    <div>
      <div className="interview-header">
        <p>{title}</p>
      </div>
      <div className={`interview-step-content ${name}`}>
        <Group buttonStyle="outline" size="large" className="interview-form__radio-group">
          {arr.map((option) => (
            <RadioInput name={name} value={data} handleChange={handleChange} option={option} />
          ))}
        </Group>
      </div>
    </div>
  );
};

Step.propTypes = {
  title: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    language: PropTypes.string.isRequired,
    specialization: PropTypes.string.isRequired,
    questionCategory: PropTypes.string.isRequired,
  }).isRequired,

};

export default Step;
