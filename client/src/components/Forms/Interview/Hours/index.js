/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import React from 'react';
import { Input } from 'antd';

const Hours = ({ hour, time, handleChange }) => (
  <>
    <Input
      type="radio"
      key={hour}
      value={hour}
      onChange={handleChange}
      className="interview-form__radio-input"
      name="time"
      id={hour}
      checked={+hour === +time}
    />
    <label htmlFor={hour} className="interview-form__radio-label">
      {hour.length === 1 ? `0${hour}:00` : `${hour}:00`}
      {' '}
      -
      {' '}
      {hour.length === 1 ? `0${hour + 1}:00` : `${hour + 1}:00`}
    </label>

  </>
);

export default Hours;
