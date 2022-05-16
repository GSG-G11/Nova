import React, { useState } from 'react';
import axios from 'axios';
import {
  Form, Input, Checkbox, Button, message,
} from 'antd';
import './setting.css';

const SettingTab = () => {
  const { Item } = Form;
  const options = [
    { label: 'Junior', value: 'Junior' },
    { label: 'Senior', value: 'Senior' },
    { label: 'Internship', value: 'Internship' },
    { label: 'Expert', value: 'Expert' },
    { label: 'Mid-level', value: 'Mid-level' },
  ];
  const [imgLink, setImgLink] = useState('');
  const [cvLink, setCVLink] = useState('');
  const [bio, setBio] = useState('');
  const [experenice, setExperenice] = useState('');

  const updateSetting = async () => {
    const source = axios.CancelToken.source();
    try {
      const res = await axios.post('/api/user', {
        imgLink,
        cvLink,
        bio,
        experenice,
      }, {
        cancelToken: source.token,
      });
      message.success(res.massage);
    } catch ({ Response: { data: { message: msg } } }) {
      message.error({ msg });
    }
    return () => {
      source.cancel();
    };
  };

  return (
    <div className="setting-tab">
      <Form layout="vertical" autoComplete="off">
        <Item name="name" label="Image Link" type="url" value={imgLink} onChange={(e) => setImgLink(e.target.value)}>
          <Input placeholder="Please input your img Url" value={imgLink} />
        </Item>
        <Item name="age" label="CV Link" type="url" value={cvLink} onChange={(e) => setCVLink(e.target.value)}>
          <Input placeholder="Please input your CV Url" value={cvLink} />
        </Item>
        <Item name="bio" label="Bio" type="text" value={bio}>
          <Input.TextArea placeholder="Please input your Bio" onChange={(e) => setBio(e.target.value)} value={bio} />
        </Item>
        <Item name="experenice" label="Level of Experenice" value={experenice} onChange={(e) => setExperenice(e.target.value)}>
          <Checkbox.Group options={options} />
        </Item>
      </Form>
      <div className="btn-save-holder">
        <Button type="primary" htmlType="submit" onClick={updateSetting}>
          Save
        </Button>
      </div>

    </div>

  );
};

export default SettingTab;
