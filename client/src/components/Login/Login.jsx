import React, { useState } from 'react';
import {
  Form, Input, Button,
} from 'antd';
import axios from 'axios';
import './Login.css';

function Demo() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const changeEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const onFinish = async () => {
    await axios.post('/api/login', {
      email,
      password,
    });
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="Email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
            type: 'email',
          },
        ]}
      >
        <Input onChange={changeEmail} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/,
          },
        ]}
      >
        <Input.Password onChange={changePassword} />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Login
        </Button>
        <div className="have-account">
          Don`t have an account?
          <a href="/signup">Sign up</a>

        </div>
      </Form.Item>
    </Form>
  );
}

export default Demo;
