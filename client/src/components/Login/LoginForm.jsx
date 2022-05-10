import React, { useState } from 'react';
import {
  Form, Input, Button,
  message,
} from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import '../Forms/signup/signup.css';
import { signUpAction } from '../../redux/features/auth/authSlice';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { Item } = Form;
  const { Password } = Input;
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const onFinish = async () => {
    try {
      const { data } = await axios.post('/api/login', { email, password });
      dispatch(signUpAction(data.data.user));
      // when all pages done link to home page
    } catch ({ response: { data: { message: msg } } }) {
      message.error(msg);
    }
  };

  return (
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
      onFinish={onFinish}
      autoComplete="off"
    >
      <Item
        label="Email"
        name="Email"
        rules={[
          {
            type: 'email',
            message: 'Please input a valid email!',
          },
          {
            required: true,
            message: 'Please input your Email!',
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
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/,
            message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
          },
          {
            required: true,
            message: 'Please input your password!',
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
        <Button type="primary" htmlType="submit" className="signup">
          Login
        </Button>
      </Item>
    </Form>
  );
};

export default LoginForm;
