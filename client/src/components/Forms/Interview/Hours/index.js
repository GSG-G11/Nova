/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import React from 'react';
import { Input } from 'antd';

const Hours = ({
  hour, time, handleChange, toggleHours, i, date,
}) => (
  <div style={toggleHours === i ? { display: 'block' } : { display: 'none' }}>
    <Input
      type="radio"
      key={hour}
      value={hour}
      onChange={handleChange}
      className="interview-form__radio-input"
      name="time"
      id={`${date}${hour}`}
      checked={+hour === +time}
    />
    <label htmlFor={`${date}${hour}`} className="interview-form__radio-label">
      {hour.length === 1 ? `0${hour}:00` : `${hour}:00`}
      {' '}
      -
      {' '}
      {hour.length === 1 ? `0${hour + 1}:00` : `${hour + 1}:00`}
    </label>

  </div>
);

export default Hours;
