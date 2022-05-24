import React, { useState } from 'react';
import axios from 'axios';
import {
  Form, Input, Button, message, Radio,
} from 'antd';
import './style.css';

const SettingTab = () => {
  const { Item } = Form;
  const { TextArea } = Input;
  const { Group } = Radio;

  const [imgLink, setImgLink] = useState('');
  const [cvLink, setCVLink] = useState('');
  const [bio, setBio] = useState('');
  const [experenice, setExperenice] = useState('');
  const updateSetting = async () => {
    const source = axios.CancelToken.source();
    try {
      const { message: successMsg } = await axios.post('/api/user', {
        imgLink,
        cvLink,
        bio,
        experenice,
      }, {
        cancelToken: source.token,
      });
      message.success(successMsg);
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
          <TextArea placeholder="Please input your Bio" onChange={(e) => setBio(e.target.value)} value={bio} />
        </Item>
        <Item name="experenice" label="Level of Experenice">
          <Group value={experenice} onChange={(e) => setExperenice(e.target.value)}>
            <Radio value="Junior">Junior</Radio>
            <Radio value="Mid-level">Mid-level</Radio>
            <Radio value="Senior">Senior</Radio>
            <Radio value="Internship">Internship</Radio>
            <Radio value="Expert">Expert</Radio>
          </Group>
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
