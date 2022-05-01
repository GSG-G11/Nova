/* eslint-disable no-console */
import React, { useState } from 'react';
import axios from 'axios';
import {
  Modal,
  Button,
  Form,
  Input,
  message,
} from 'antd';
import logo from '../../../assets/images/logo.png';
import './index.css';

const { Item } = Form;
const { Password } = Input;

function Signup() {
  // eslint-disable-next-line no-unused-vars
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const signUp = async () => {
    try {
      await axios.post('/api/signup', {
        fullName,
        email,
        password,
      });
      setIsModalVisible(false);
      message.success('Welcome to Nova');
    } catch (err) {
      message.error(`Sorry, try again , ${err.message}`);
    }
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const confirmPasswordHandel = (getFieldValue) => ({
    validator(_, value) {
      if (!value || getFieldValue('Password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('The two passwords that you entered do not match!'));
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
        onCancel={handleCancel}
        visible={isModalVisible}
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
          <Item
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
          </Item>

          <Item
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
          </Item>

          <Item
            name="Password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rules={[
              {
                // password Should be combination of numbers & alphabets and one special character
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/,
                message: 'Password must contain at least one lowercase letter, uppercase letter, number, and special character',
              },
              {
                required: true,
                message: 'Please input your Passsword',
              },
            ]}
            hasFeedback
          >
            <Password />
          </Item>

          <Item
            name="confirm"
            label="Confirm Password"
            dependencies={['Password']}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              // ({ getFieldValue }) => ({
              //   validator(_, value) {
              //     if (!value || getFieldValue('password') === value) {
              //       return Promise.resolve();
              //     }
              // eslint-disable-next-line max-len
              //     return Promise.reject(new Error('The two passwords that you entered do not match!'));
              //   },
              // }),
              ({ getFieldValue }) => confirmPasswordHandel(getFieldValue),
            ]}
          >
            <Input.Password />
          </Item>
          <Item>
            <div className="form-group-btn">
              <Button type="primary" htmlType="submit" className="signup">
                Register
              </Button>
            </div>
          </Item>
        </Form>
      </Modal>
    </>
  );
}

export default Signup;
