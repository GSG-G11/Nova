/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Input, Radio } from 'antd';

const { Group } = Radio;
// eslint-disable-next-line react/prop-types
const StepFour = ({ title }) => (
  <div>
    <div className="interview-header">
      <p>{title}</p>
    </div>
    <div className="interview-step-content">
      <Group buttonStyle="outline" size="large" className="interview-form__radio-group-fourth">
        <div className="date-column">
          <p className="interview-form__date">2022 - 05 - 14</p>
          <Input
            name="specialization"
            type="radio"
            id="FRONTEND"
            value={12}
            className="interview-form__radio-input"
          />
          <label htmlFor="FRONTEND">
            12:00 - 13:00
          </label>

          <Input
            name="specialization"
            type="radio"
            value={14}
            id="SECURITY"
            className="interview-form__radio-input"
          />
          <label htmlFor="SECURITY">
            14:00 - 15:00
          </label>
          <Input
            name="specialization"
            type="radio"
            value={16}
            id="BACKEND"
            className="interview-form__radio-input"
          />
          <label htmlFor="BACKEND">
            16:00 - 17:00
          </label>
        </div>

        <div className="date-column">
          <p className="interview-form__date">2022 - 05 - 20</p>
          <Input
            name="specialization"
            type="radio"
            id="12-2022-05-20"
            value={12}
            className="interview-form__radio-input"
          />
          <label htmlFor="12-2022-05-20">
            12:00 - 13:00
          </label>

          <Input
            name="specialization"
            type="radio"
            value={14}
            id="14-2022-05-20"
            className="interview-form__radio-input"
          />
          <label htmlFor="14-2022-05-20">
            14:00 - 15:00
          </label>
          <Input
            name="specialization"
            type="radio"
            value={16}
            id="16-2022-05-20"
            className="interview-form__radio-input"
          />
          <label htmlFor="16-2022-05-20">
            16:00 - 17:00
          </label>
        </div>
        <div className="date-column">
          <p className="interview-form__date">2022 - 06 - 20</p>
          <Input
            name="specialization"
            type="radio"
            id="12-2022-06-20"
            value={12}
            className="interview-form__radio-input"
          />
          <label htmlFor="12-2022-06-20">
            12:00 - 13:00
          </label>

          <Input
            name="specialization"
            type="radio"
            value={14}
            id="14-2022-06-20"
            className="interview-form__radio-input"
          />
          <label htmlFor="14-2022-06-20">
            14:00 - 15:00
          </label>
          <Input
            name="specialization"
            type="radio"
            value={16}
            id="16-2022-06-20"
            className="interview-form__radio-input"
          />
          <label htmlFor="16-2022-06-20">
            16:00 - 17:00
          </label>
        </div>

        <div className="date-column">
          <p className="interview-form__date">2022 - 05 - 28</p>
          <Input
            name="specialization"
            type="radio"
            id="12-2022-05-28"
            value={12}
            className="interview-form__radio-input"
          />
          <label htmlFor="12-2022-05-28">
            12:00 - 13:00
          </label>

          <Input
            name="specialization"
            type="radio"
            value={14}
            id="14-2022-05-28"
            className="interview-form__radio-input"
          />
          <label htmlFor="14-2022-05-28">
            14:00 - 15:00
          </label>
          <Input
            name="specialization"
            type="radio"
            value={16}
            id="16-2022-05-28"
            className="interview-form__radio-input"
          />
          <label htmlFor="16-2022-05-28">
            16:00 - 17:00
          </label>
        </div>

      </Group>
    </div>
  </div>
);

export default StepFour;
