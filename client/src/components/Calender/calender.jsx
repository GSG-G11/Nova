/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import {
  DatePicker, Button, Form, message, Alert, Calendar, Badge,
} from 'antd';
import './calender.css';
// Tag, Tooltip,
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
  const disabledDates = availableDates.length > 0 ? availableDates.map(({ date }) => date.split('T')[0]) : [];
  const disabledDate = (current) => disabledDates.find((date) => date === moment(current).format('YYYY-MM-DD'));
  const dayArr = disabledDates.map((date) => parseInt(date.split('-')[2], 10));

  const getListData = (val) => {
    const listData = [];
    dayArr.map((dayNum) => {
      const availableTime = availableDates.filter((item) => (parseInt(item.date.split('T')[0].split('-')[2], 10) === dayNum)).map((item) => item.time);
      switch (val.date()) {
        case dayNum:
          availableTime.forEach((h) => h.forEach((hour) => listData.push({ type: 'success', content: `${hour}:00` })));
          break;
        default:
      }
      return listData;
    });
    return listData || [];
  };

  const getMonthData = (val) => {
    if (val.month() === 8) {
      return 1394;
    }
  };

  const monthCellRender = (val) => {
    const num = getMonthData(val);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const dateCellRender = (val) => {
    const listData = getListData(val);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

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

        <Calendar disabledDate={disabledDate} dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
      </div>
    </div>
  );
};

export default CalenderTab;
