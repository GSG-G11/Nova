/* eslint-disable no-console */
import React, { useState } from 'react';
import {
  Modal,
  Button,
  Form,
  Input,
  message,
} from 'antd';
import logo from '../../assets/images/logo.png';
import './Signup.css';

const axios = require('axios').default;

function Signup() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = async () => {
    try {
      await axios.post('/api/signup', { fullName, email, password });
      message.success('Welcome to Nova');
    } catch (err) {
      // handel error
      console.log(err);
    }
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const passwordValidation = () => ({
    validator(_, value) {
      if (value.length >= 4) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('password should have at least 4 character '));
    },
  });
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title={(
          <div className="modal-logo-img">
            <img src={logo} alt="logo" className="logo-img" />
          </div>
        )}
        visible={isModalVisible}
        onOk={handleOk}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{
            span: 20,
          }}
          wrapperCol={{
            span: 25,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          onFinish={signUp}
        >
          <Form.Item
            name="fullName"
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            rules={[
              {
                type: 'text',
                message: 'The input is not valid Full Name!',
              },
              {
                required: true,
                message: 'Please input your Full Name',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="Password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rules={[
              {
                // password Should be combination of numbers & alphabets and one special character
                // eslint-disable-next-line prefer-regex-literals
                pattern: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{4,}$'),
                message: 'Password must contain at least one lowercase letter, uppercase letter, number, and special character',
              },
              {
                required: true,
                message: 'Please input your Passsword',
              },
              () => passwordValidation(),
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('Password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <div className="form-group-btn">
              <Button type="primary" htmlType="submit" className="signup">
                Register
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Signup;
