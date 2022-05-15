/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Input, Radio } from 'antd';
import Hours from '../Hours';

const { Group } = Radio;
// eslint-disable-next-line react/prop-types
const StepFour = ({
  title, handleChange, availableTime, setFormData,
  formData,
}) => {
  const [hours, setHours] = useState([]);
  const [toggleHours, setToggleHours] = useState(null);

  return (
    <div>
      <div className="interview-header">
        <p>{title}</p>
      </div>
      <div className="interview-step-content">
        <Group buttonStyle="outline" size="large" className="interview-form__radio-group-fourth">
          <div className="date-column">
            {availableTime.map((slot, i) => (
              <>

                <Input
                  type="radio"
                  key={slot._id}
                  value={slot.date.split('T')[0]}
                  onChange={handleChange}
                  onClick={() => {
                    setHours(slot.time);
                    setFormData({
                      ...formData,
                      interviewerId: slot.interviewerId,
                    });
                    setToggleHours((prevState) => {
                      if (prevState === i) {
                        return null;
                      }
                      return i;
                    });
                  }}
                  className="interview-form__radio-input"
                  name="date"
                  id={slot._id}
                  checked={slot.date.split('T')[0] === formData.date}
                />
                <label htmlFor={slot._id} className="interview-form__radio-label">
                  {slot.date.split('T')[0]}
                </label>

                <div
                  className="interview-form__radio-group-fourth-hours"
                >
                  {hours && hours.map((hour) => (

                    <Hours
                      time={formData.time}
                      date={formData.date}
                      hour={hour}
                      handleChange={handleChange}
                      toggleHours={toggleHours}
                      i={i}
                    />
                  ))}
                </div>
              </>
            ))}
          </div>

        </Group>
      </div>
    </div>
  );
};

export default StepFour;
