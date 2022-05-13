import React, { useState } from 'react';
import axios from 'axios';
import {
  Form, Input, Checkbox, Button, message,
} from 'antd';

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
    try {
      await axios.post('/api/user', {
        imgLink,
        cvLink,
        bio,
        experenice,
      });
      message.success('Your information is updated successfully');
    } catch ({ Response: { data: { message: msg } } }) {
      message.error({ msg });
    }
  };

  return (
    <div>
      <Form layout="vertical" autoComplete="off" onFinish={updateSetting}>
        <Item name="name" label="Image Link" type="url" value={imgLink} onChange={(e) => setImgLink(e.target.value)}>
          <Input placeholder="Please input your img Url" />
        </Item>
        <Item name="age" label="CV Link" type="url" value={cvLink} onChange={(e) => setCVLink(e.target.value)}>
          <Input placeholder="Please input your CV Url" />
        </Item>
        <Item name="bio" label="Bio" type="text" value={bio}>
          <Input.TextArea placeholder="Please input your Bio" onChange={(e) => setBio(e.target.value)} />
        </Item>
        <Item name="experenice" label="Level of Experenice" value={experenice} onChange={(e) => setExperenice(e.target.value)}>
          <Checkbox.Group options={options} />
        </Item>
      </Form>
      <div className="btn-save-holder">
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </div>

    </div>

  );
};

export default SettingTab;
