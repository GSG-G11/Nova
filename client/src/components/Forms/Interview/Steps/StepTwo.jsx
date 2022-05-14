/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Input, Radio } from 'antd';

const { Group } = Radio;
// eslint-disable-next-line react/prop-types
const StepTwo = ({ title, handleChange, formData: { language } }) => (
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
          onChange={handleChange}
          checked={language === 'JS'}

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
          onChange={handleChange}
          checked={language === 'PHP'}

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
          onChange={handleChange}
          checked={language === 'C++'}

        />
        <label htmlFor="C++">
          C++
        </label>
        <Input
          name="language"
          type="radio"
          value="RUBY"
          id="Ruby"
          className="interview-form__radio-input"
          onChange={handleChange}
          checked={language === 'RUBY'}

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
          onChange={handleChange}
          checked={language === 'C#'}

        />
        <label htmlFor="C#">
          C#
        </label>
        <Input
          name="language"
          type="radio"
          value="JAVA"
          id="Java"
          className="interview-form__radio-input"
          onChange={handleChange}
          checked={language === 'JAVA'}

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
          onChange={handleChange}
          checked={language === 'C'}

        />
        <label htmlFor="C">
          C
        </label>
        <Input
          name="language"
          type="radio"
          value="GO"
          id="Go"
          className="interview-form__radio-input"
          onChange={handleChange}
          checked={language === 'GO'}

        />
        <label htmlFor="Go">
          Go
        </label>
        <Input
          name="language"
          type="radio"
          value="PYTHON"
          id="Python"
          className="interview-form__radio-input"
          onChange={handleChange}
          checked={language === 'PYTHON'}

        />
        <label htmlFor="Python">
          Python
        </label>

      </Group>
    </div>
  </div>
);

export default StepTwo;
