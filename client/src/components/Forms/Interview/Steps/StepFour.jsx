/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Input, Radio } from 'antd';
import Hours from '../Hours';

const { Group } = Radio;
// eslint-disable-next-line react/prop-types
const StepFour = ({
  title, handleChange, availableTime,
  formData,
}) => {
  const [hours, setHours] = React.useState([]);
  const [toggleHours, setToggleHours] = React.useState(false);
  return (
    <div>
      <div className="interview-header">
        <p>{title}</p>
      </div>
      <div className="interview-step-content">
        <Group buttonStyle="outline" size="large" className="interview-form__radio-group-fourth">
          <div className="date-column">
            {availableTime.map((slot) => (
              <>
                <Input
                  type="radio"
                  key={slot._id}
                  value={slot.date.split('T')[0]}
                  onChange={handleChange}
                  onClick={() => {
                    setHours(slot.time);
                    setToggleHours((prevState) => !prevState);
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
                  style={toggleHours ? { display: 'block' } : { display: 'none' }}
                >
                  {hours && hours.map((hour) => (

                    <Hours
                      time={formData.time}
                      hour={hour}
                      handleChange={handleChange}
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
