import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import LoginForm from './LoginForm';
import logo from '../../assets/Nova Logo.png';
import './style.css';

const LoginModal = function () {
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
      <Modal title="Log in" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <img className="logo" src={logo} alt="logo" />
        <LoginForm />
      </Modal>
    </>
  );
};

export default LoginModal;
