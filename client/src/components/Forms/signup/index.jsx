import React, { useState } from 'react';
import {
  Button,
  Modal,
} from 'antd';
import logo from '../../../assets/images/logo.png';
import SingUpForm from './Form';
import './style.css';

const Signup = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Sign Up
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
        <SingUpForm />
      </Modal>
    </>
  );
};

export default Signup;
