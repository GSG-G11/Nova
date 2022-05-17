/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { Input, Radio } from 'antd';
import PropTypes from 'prop-types';
import Hours from '../Hours';
import LoadingSpinner from '../../../common/LoadingSpinner';

const { Group } = Radio;
const StepFour = ({
  title, handleChange, availableTime, setFormData,
  formData, loading,
}) => {
  const [hours, setHours] = useState([]);
  const [toggleHours, setToggleHours] = useState(null);
  return (
    <div>
      <div className="interview-header">
        <p>{title}</p>
      </div>
      <div className="interview-step-content fourth">
        {loading ? <LoadingSpinner /> : (

          <Group buttonStyle="outline" size="large" className="interview-form__radio-group-fourth">
            <div className="date-column">
              {!availableTime.length && (
              <p>
                Sorry, no available interviewers for this date.
              </p>
              )}
              {availableTime.length && availableTime.map((slot, i) => (
                <div className="column">
                  <Input
                    type="radio"
                    key={slot._id}
                    value={slot.date.split('T')[0]}
                    onChange={handleChange}
                    onClick={() => {
                      setHours(slot.time);
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
                  <label
                    htmlFor={slot._id}
                    onClick={() => {
                      setFormData({
                        ...formData,
                        interviewerId: slot.interviewerId,
                      });
                    }}
                    aria-hidden="true"
                    className="interview-form__radio-label"
                  >
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
                </div>
              ))}
            </div>
          </Group>
        )}
      </div>
    </div>
  );
};

StepFour.propTypes = {
  title: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  availableTime: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.arrayOf(PropTypes.string).isRequired,
    interviewerId: PropTypes.string.isRequired,
  })).isRequired,
  setFormData: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    interviewerId: PropTypes.string.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default StepFour;
