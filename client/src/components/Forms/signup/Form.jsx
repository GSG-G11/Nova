import React, { useState } from 'react';
import {
  Button,
  Form,
  Input,
  message,
} from 'antd';
import '../style.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import LoadingSpinner from '../../common/LoadingSpinner';
import LoginButton from '../Login/LoginButton';

const confirmPasswordHandel = (getFieldValue) => ({
  validator(_, value) {
    if (!value || getFieldValue('Password') === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('The two passwords that you entered do not match!'));
  },
});

const SignupForm = ({ setIsModalVisible }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const signup = async () => {
    try {
      setLoading(true);
      const { data: { message: verifyMessage } } = await axios.post('/api/signup', {
        name: fullName,
        email,
        password,
        confirm,
        role: 'interviewee',
      });
      message.success(`Welcome ${fullName}, ${verifyMessage}`);
      setLoading(false);
      setIsModalVisible(false);
    } catch ({ response: { data: { message: msg } } }) {
      message.error(msg);
      setLoading(false);
    }
  };

  const { Item } = Form;
  const { Password } = Input;
  return (
    <Form
      name="basic"
      labelCol={{
        span: 20,
      }}
      wrapperCol={{
        span: 25,
      }}
      className="signup-form"
      initialValues={{
        remember: true,
      }}
      autoComplete="off"
      onFinish={() => signup()}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>

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
              ({ getFieldValue }) => confirmPasswordHandel(getFieldValue),
            ]}
          >
            <Password />
          </Item>
          <Item>
            <div className="form-group-btn">
              <Button type="primary" htmlType="submit" className="signup">
                Register
              </Button>
            </div>
          </Item>
          <Item>
            <div className="have-account">
              <span>
                Do you have an account?
              </span>

              <LoginButton title="Login" className="btn-link" signUpForm={() => setIsModalVisible(false)} />
            </div>
          </Item>
        </>
      )}
    </Form>
  );
};

SignupForm.propTypes = {
  setIsModalVisible: PropTypes.func.isRequired,
};

export default SignupForm;
