import React, { useState } from 'react';
import axios from 'axios';
import {
  Form, Input, Button, message, Radio, Upload,
} from 'antd';
import './style.css';

const SettingTab = () => {
  const { Item } = Form;
  const { TextArea } = Input;
  const { Group } = Radio;

  const [imgLink, setImgLink] = useState('');
  const [cvLink, setCVLink] = useState('');
  const [bio, setBio] = useState('');
  const [level, setLevel] = useState('');
  const updateSetting = async () => {
    const source = axios.CancelToken.source();
    try {
      const { message: successMsg } = await axios.post('/api/user', {
        imgLink,
        cvLink,
        bio,
        level,
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

        <Item label="Avatar">

          <Upload
            name="profile_picture"
            listType="picture-card"
            className="avatar-uploader"
            action="/api/user"
            showUploadList={false}
            beforeUpload={() => {
              message.error('Please upload a profile picture');
              return false;
            }}
            onChange={({ file }) => {
              setImgLink(file.response.data);
            }}
          >
            {imgLink ? <img src={imgLink} alt="avatar" /> : (
              <div>
                <div className="ant-upload-text">Upload</div>
              </div>
            )}
          </Upload>
        </Item>
        <Item name="age" label="CV Link" type="url" value={cvLink} onChange={(e) => setCVLink(e.target.value)}>
          <Input placeholder="Please input your CV Url" value={cvLink} />
        </Item>
        <Item name="bio" label="Bio" type="text" value={bio}>
          <TextArea placeholder="Please input your Bio" onChange={(e) => setBio(e.target.value)} value={bio} />
        </Item>
        <Item name="level" label="Level of Experience">
          <Group value={level} onChange={(e) => setLevel(e.target.value)}>
            <Radio value="JUNIOR">Junior</Radio>
            <Radio value="MIDDLE">Mid-level</Radio>
            <Radio value="SENIOR">Senior</Radio>
            <Radio value="INTERNSHIP">Internship</Radio>
            <Radio value="EXPERT">Expert</Radio>
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
