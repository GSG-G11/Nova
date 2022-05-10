/* eslint-disable react/jsx-first-prop-new-line */
import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import LoginForm from './LoginForm';
import logo from '../../assets/Nova Logo.png';
import '../Forms/signup/signup.css';

const LoginButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Log in
      </Button>
      <Modal title={(
        <div className="modal-logo-img">
          <img src={logo} alt="logo" className="logo-img" />
        </div>
        )}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <LoginForm />
      </Modal>
    </>
  );
};

export default LoginButton;
