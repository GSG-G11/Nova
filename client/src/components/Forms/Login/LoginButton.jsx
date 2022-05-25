/* eslint-disable import/no-cycle */
import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import logo from '../../../assets/images/logo.png';
import '../style.css';

const LoginButton = ({ title, className, signUpForm }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    signUpForm();
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button className={className || 'loginBtn'} type="primary" onClick={showModal}>
        {title}
      </Button>
      <Modal
        title={(
          <div className="modal-logo-img">
            <img src={logo} alt="logo" className="logo-img" />
          </div>
        )}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <LoginForm
          handleOk={handleOk}
        />
      </Modal>
    </>
  );
};

LoginButton.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  signUpForm: PropTypes.func.isRequired,
};

LoginButton.defaultProps = {
  className: '',
};
export default LoginButton;
