/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import {
  DatePicker, Button, Form, message, Alert, Tag, Tooltip,
} from 'antd';
import './calender.css';

const { Item } = Form;

const CalenderTab = () => {
  const [value, setValue] = useState();
  const [availableDates, setAvailableDates] = useState([]);
  let day = '';
  let time = 0;

  if (value) {
    day = value.format('YYYY-MM-DD HH').split(' ')[0].toString();
    time = value.format('YYYY-MM-DD HH').split(' ')[1].toString();
  }

  const postDate = async () => {
    const source = axios.CancelToken.source();
    try {
      await axios.post('/api/interviewer/schedule', {
        day,
        time,
      }, {
        cancelToken: source.token,
      });
        <Alert
          message={`You selected date: ${value.format('YYYY-MM-DD HH')}`}
        />;
    } catch ({ Response: { data: { message: msg } } }) {
      message.error({ msg });
    }
    return () => {
      source.cancel();
    };
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    try {
      const getAvailableDate = async () => {
        const { data } = await axios.get('/api/users/interviewer/available', {
          cancelToken: source.token,
        });
        setAvailableDates(data);
      };
      getAvailableDate();
    } catch ({ response: { data: { message: msg } } }) {
      message.error(msg);
    }

    return () => {
      source.cancel();
    };
  }, []);

  return (
    <div className="calender-tab">
      <div className="timePicker">
        <Form layout="vertical" autoComplete="off" className="datepickerForm">
          <Item name="name" label="Select your available time" type="url">
            <DatePicker
              value={value}
              format="YYYY-MM-DD HH"
              showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
              onChange={(val) => setValue(val)}
            />
          </Item>
          <div className="btn-save-holder">
            <Button type="primary" htmlType="submit" onClick={postDate}>
              Save
            </Button>
          </div>
        </Form>
      </div>
      <div className="tags-holder">
        <h3 className="dates-sec">Your Available Dates</h3>
        {availableDates.map((date) => (
          <Tooltip placement="topLeft" title={date.time} arrowPointAtCenter>
            <Tag color="purple">{date.date}</Tag>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default CalenderTab;
