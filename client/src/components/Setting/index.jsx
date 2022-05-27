import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Form, Input, Button, message, Radio,
} from 'antd';
import propTypes from 'prop-types';
import './style.css';
import { useDispatch } from 'react-redux';
import { setImage } from '../../redux/features/auth/authSlice';

const SettingTab = ({ user }) => {
  const { Item } = Form;
  const { TextArea } = Input;
  const { Group } = Radio;
  const dispatch = useDispatch();
  const [image, setImgLink] = useState('');
  const [cv, setCVLink] = useState('');
  const [bio, setBio] = useState('');
  const [level, setLevel] = useState('');

  useEffect(() => {
    const {
      profilePicture, level: userLevel, bio: userBio, cv: userCv,
    } = user;
    setCVLink(userCv);
    setImgLink(profilePicture);
    setBio(userBio);
    setLevel(userLevel);
  }, []);

  const updateSetting = async () => {
    try {
      const { data: { message: successMsg } } = await axios.patch('/api/user', {
        image, cv, bio, level,
      });
      dispatch(setImage(image));
      message.success(successMsg);
    } catch ({ response: { data: { message: msg } } }) {
      message.error(msg);
    }
  };

  return (
    <div className="setting-tab">
      <Form
        layout="vertical"
        autoComplete="off"
        initialValues={user}
      >
        <Item
          name="profilePicture"
          label="Image Link"
          type="url"
          value={image}
          onChange={({ target: { value } }) => setImgLink(value)}
        >
          <Input
            placeholder="Please input your img Url"
          />
        </Item>
        <Item
          name="cv"
          label="CV Link"
          type="url"
          value={cv}
          onChange={({ target: { value } }) => setCVLink(value)}
        >
          <Input
            placeholder="Please input your CV Url"
          />
        </Item>
        <Item
          name="bio"
          label="Bio"
          type="text"
          onChange={({ target: { value } }) => setBio(value)}
          value={bio}
        >
          <TextArea
            placeholder="Please input your Bio"
          />
        </Item>
        <Item
          name="level"
          label="Level of Experience"
        >
          <Group
            value={level}
            onChange={({ target: { value } }) => setLevel(value)}
          >
            <Radio value="JUNIOR">Junior</Radio>
            <Radio value="MIDDLE">Mid-level</Radio>
            <Radio value="SENIOR">Senior</Radio>
            <Radio value="INTERNSHIP">Internship</Radio>
            <Radio value="EXPERT">Expert</Radio>
          </Group>
        </Item>
      </Form>
      <div className="btn-save-holder">
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => updateSetting()}
        >
          Save
        </Button>
      </div>
    </div>

  );
};

SettingTab.propTypes = {
  user: propTypes.shape({
    profilePicture: propTypes.string,
    level: propTypes.string,
    bio: propTypes.string,
    cv: propTypes.string,
  }).isRequired,
};

export default SettingTab;
