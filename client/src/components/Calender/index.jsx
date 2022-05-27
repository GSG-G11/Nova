import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import {
  DatePicker, Form, message, Calendar, Tag,
} from 'antd';
import './style.css';

const { Item } = Form;

const CalenderTab = () => {
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getAvailableDate = async () => {
      try {
        const { data: { data } } = await axios.get('/api/interview/available', {
          cancelToken: source.token,
        });
        setAvailableDates(data);
      } catch ({ response: { data: { message: msg } } }) {
        message.error(msg);
      }
    };
    getAvailableDate();

    return () => {
      source.cancel();
    };
  }, [availableDates]);

  const onOk = (value) => {
    const dateTime = value.format('YYYY-MM-DD HH');
    const date = dateTime.split(' ')[0].toString();
    const time = Number(dateTime.split(' ')[1]);
    try {
      axios.post('/api/interviewer/schedule', {
        date,
        time,
      });
      message.success('date added successfully to your schedule');
    } catch ({ response: { data: { message: msg } } }) {
      message.error({ msg });
    }
  };

  const dateFormat = (date) => (date.length === 1 ? `0${date}` : date);

  const getListData = (val) => {
    const listData = [];
    const availableDate = availableDates.map((item) => item.date.split('T')[0]);
    availableDate.map((date) => {
      if (date === `${val.year()}-${dateFormat(`${val.month() + 1}`)}-${dateFormat(`${val.date()}`)}`) {
        const availableTime = availableDates.filter((item) => item.date.split('T')[0] === date).map((item) => item.time);
        availableTime.forEach((h) => h.forEach((hour) => listData.push({ content: `${hour}:00` })));
      }
      return listData;
    });
    return listData;
  };

  const dateCellRender = (val) => {
    const listData = getListData(val);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Tag color="purple">
              {' '}
              {item.content}
            </Tag>
          </li>
        ))}
      </ul>
    );
  };

  const disabledDay = (current) => current && current < moment().endOf('day');

  return (
    <div className="calender-tab">
      <div className="timePicker">
        <Form layout="vertical" autoComplete="off" className="datepickerForm">
          <Item name="name" label="Select your available time" type="url">
            <DatePicker
              format="YYYY-MM-DD HH"
              showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
              disabledDate={disabledDay}
              onOk={onOk}
            />
          </Item>
        </Form>
      </div>
      <div className="dateTimeCalender-holder">
        <h3 className="dates-sec">My Schedule</h3>
        <div className="calenders-holder">
          <Calendar
            dateCellRender={dateCellRender}
          />
        </div>
      </div>
    </div>
  );
};

export default CalenderTab;
