/* eslint-disable react/prop-types */
import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

const RadioInput = ({
  name, value, handleChange, option,
}) => (
  <>
    <Input
      name={name}
      type="radio"
      id={option}
      value={option}
      className="interview-form__radio-input"
      onClick={handleChange}
      checked={value === option}
    />
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label htmlFor={option}>
      {option === 'JS' ? 'JavaScript' : option}
    </label>

  </>
);

RadioInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  option: PropTypes.string.isRequired,
};

export default RadioInput;
