/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Input, Radio } from 'antd';

const { Group } = Radio;
// eslint-disable-next-line react/prop-types
const StepTwo = ({ title }) => (
  <div>
    <div className="interview-header">
      <p>{title}</p>
    </div>
    <div className="interview-step-content">
      <Group buttonStyle="outline" size="large" className="interview-form__radio-group-second">
        <Input
          name="language"
          type="radio"
          id="JavaScript"
          value="JS"
          className="interview-form__radio-input"

        />
        <label htmlFor="JavaScript">
          JavaScript
        </label>
        <Input
          name="language"
          type="radio"
          value="PHP"
          id="PHP"
          className="interview-form__radio-input"

        />
        <label htmlFor="PHP">
          PHP
        </label>
        <Input
          name="language"
          type="radio"
          value="C++"
          id="C++"
          className="interview-form__radio-input"

        />
        <label htmlFor="C++">
          C++
        </label>
        <Input
          name="language"
          type="radio"
          value="Ruby"
          id="Ruby"
          className="interview-form__radio-input"

        />
        <label htmlFor="Ruby">
          Ruby
        </label>
        <Input
          name="language"
          type="radio"
          value="C#"
          id="C#"
          className="interview-form__radio-input"

        />
        <label htmlFor="C#">
          C#
        </label>
        <Input
          name="language"
          type="radio"
          value="Java"
          id="Java"
          className="interview-form__radio-input"

        />
        <label htmlFor="Java">
          Java
        </label>
        <Input
          name="language"
          type="radio"
          value="C"
          id="C"
          className="interview-form__radio-input"

        />
        <label htmlFor="C">
          C
        </label>
        <Input
          name="language"
          type="radio"
          value="Go"
          id="Go"
          className="interview-form__radio-input"

        />
        <label htmlFor="Go">
          Go
        </label>
        <Input
          name="language"
          type="radio"
          value="Python"
          id="Python"
          className="interview-form__radio-input"

        />
        <label htmlFor="Python">
          Python
        </label>

      </Group>
    </div>
  </div>
);

export default StepTwo;
