import React, { useState } from 'react';
import {
  Form, Input, Button,
} from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import './style.css';
import { setUser } from '../../redux/features/auth/user';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const { Item } = Form;
  const { Password } = Input;
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
      role: 'interviewee',
    })
      .then((res) => {
        if (res.data.message !== 'Login successful') {
          throw new Error('Login failed');
        }
        dispatch(setUser(res.data.data.user));
      }).catch(() => {
        dispatch(setUser({ isVerified: false, role: '' }));
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
      <Item
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
      </Item>

      <Item
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
        <Password onChange={changePassword} />
      </Item>

      <Item
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
      </Item>
    </Form>
  );
}

export default Login;
