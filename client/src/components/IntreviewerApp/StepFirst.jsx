import React from 'react';
import {
  Form,
  Input,
} from 'antd';
import PropTypes from 'prop-types';
import '../Forms/style.css';

const confirmPasswordHandel = (getFieldValue) => ({
  validator(_, value) {
    if (!value || getFieldValue('Password') === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('The two passwords that you entered do not match!'));
  },
});
const FirstStepForm = ({
  fullName, setFullName, password, setPassword, email, setEmail, confirm, setConfirm,
}) => {
  const { Item } = Form;
  const { Password } = Input;
  return (
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

    </>
  );
};

FirstStepForm.propTypes = {
  fullName: PropTypes.string.isRequired,
  setFullName: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  confirm: PropTypes.string.isRequired,
  setConfirm: PropTypes.func.isRequired,
};

export default FirstStepForm;
