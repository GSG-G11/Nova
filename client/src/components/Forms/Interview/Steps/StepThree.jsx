/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Input, Radio } from 'antd';

const { Group } = Radio;
// eslint-disable-next-line react/prop-types
const StepThree = ({ title }) => (
  <div>
    <div className="interview-header">
      <p>{title}</p>
    </div>
    <div className="interview-step-content">
      <Group buttonStyle="outline" size="large" className="interview-form__radio-group-third">
        <Input
          name="questionCategory"
          type="radio"
          id="Technical"
          value="Technical"
          className="interview-form__radio-input"
        />
        <label htmlFor="Technical">
          Technical
        </label>
        <Input
          name="questionCategory"
          type="radio"
          value="Analytical"
          id="Analytical"
          className="interview-form__radio-input"
        />
        <label htmlFor="Analytical">
          Analytical
        </label>
        <Input
          name="questionCategory"
          type="radio"
          value="Algorithms"
          id="Algorithms"
          className="interview-form__radio-input"
        />
        <label htmlFor="Algorithms">
          Algorithms
        </label>
        <Input
          name="questionCategory"
          type="radio"
          value="System Design"
          id="System Design"
          className="interview-form__radio-input"
        />
        <label htmlFor="System Design">
          System Design
        </label>
      </Group>
    </div>

  </div>
);

export default StepThree;
