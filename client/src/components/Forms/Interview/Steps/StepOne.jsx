/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Input, Radio } from 'antd';

const { Group } = Radio;
const StepOne = ({ title, setFormData }) => {
  const onChange = (e) => {
    const { value } = e.target;
    console.log(e);
    setFormData((prevState) => ({
      ...prevState,
      specialization: value,
    }));
  };

  return (
    <div>
      <div className="interview-header">
        <p>{title}</p>
      </div>
      <div className="interview-step-content">
        <Group buttonStyle="outline" size="large" className="interview-form__radio-group">
          <Input
            name="specialization"
            type="radio"
            id="FRONTEND"
            value="FRONTEND"
            className="interview-form__radio-input"
            onChange={onChange}
          />
          <label htmlFor="FRONTEND">
            Frontend
          </label>
          <Input
            name="specialization"
            type="radio"
            value="SECURITY"
            id="SECURITY"
            className="interview-form__radio-input"
            onChange={onChange}

          />
          <label htmlFor="SECURITY">
            SECURITY
          </label>
          <Input
            name="specialization"
            type="radio"
            value="BACKEND"
            id="BACKEND"
            className="interview-form__radio-input"
            onChange={onChange}

          />
          <label htmlFor="BACKEND">
            BACKEND
          </label>
          <Input
            name="specialization"
            type="radio"
            value="DEVOPS"
            id="DEVOPS"
            className="interview-form__radio-input"
            onChange={onChange}

          />
          <label htmlFor="DEVOPS">
            DEVOPS
          </label>
          <Input
            name="specialization"
            type="radio"
            value="DATA STRUCTURE"
            id="DATA STRUCTURE"
            className="interview-form__radio-input"
            onChange={onChange}

          />
          <label htmlFor="DATA STRUCTURE">
            DATA STRUCTURE
          </label>
          <Input
            name="specialization"
            type="radio"
            value="FULL STACK"
            id="FULL STACK"
            className="interview-form__radio-input"
            onChange={onChange}
          />
          <label htmlFor="FULL STACK">
            FULL STACK
          </label>

        </Group>
      </div>
    </div>
  );
};

export default StepOne;
