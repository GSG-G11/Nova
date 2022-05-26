import React, { useState } from 'react';
import axios from 'axios';
import {
  Form, Input, Button, message, Radio,
} from 'antd';
import propTypes from 'prop-types';
import './style.css';

const SettingTab = ({ user }) => {
  const { Item } = Form;
  const { TextArea } = Input;
  const { Group } = Radio;

  const [image, setImgLink] = useState('');
  const [cv, setCVLink] = useState('');
  const [bio, setBio] = useState('');
  const [level, setExperenice] = useState('');

  const updateSetting = async () => {
    try {
      const { data: { message: successMsg } } = await axios.patch('/api/user', {
        image, cv, bio, level,
      });
      message.success(successMsg);
    } catch ({ response: { data: { message: msg } } }) {
      message.error(msg);
    }
  };

  return (
    <div className="setting-tab">
      <Form layout="vertical" autoComplete="off" initialValues={user}>
        <Item name="image" label="Image Link" type="url" value={image} onChange={({ target: { value } }) => setImgLink(value)}>
          <Input placeholder="Please input your img Url" />
        </Item>
        <Item name="cv" label="CV Link" type="url" value={cv} onChange={({ target: { value } }) => setCVLink(value)}>
          <Input placeholder="Please input your CV Url" />
        </Item>
        <Item name="bio" label="Bio" type="text" onChange={({ target: { value } }) => setBio(value)} value={bio}>
          <TextArea placeholder="Please input your Bio" />
        </Item>
        <Item name="level" label="Level of Experience">
          <Group value={level} onChange={({ target: { value } }) => setExperenice(value)}>
            <Radio value="Junior">Junior</Radio>
            <Radio value="Mid-level">Mid-level</Radio>
            <Radio value="Senior">Senior</Radio>
            <Radio value="Internship">Internship</Radio>
            <Radio value="Expert">Expert</Radio>
          </Group>
        </Item>
      </Form>
      <div className="btn-save-holder">
        <Button type="primary" htmlType="submit" onClick={() => updateSetting()}>
          Save
        </Button>
      </div>
    </div>

  );
};

SettingTab.propTypes = {
  user: propTypes.shape({
    bio: propTypes.string.isRequired,
    profilePicture: propTypes.string.isRequired,
    level: propTypes.string.isRequired,
    cv: propTypes.string.isRequired,
  }).isRequired,
};
export default SettingTab;
