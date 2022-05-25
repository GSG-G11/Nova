/* eslint-disable react/jsx-first-prop-new-line */
import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import logo from '../../../assets/images/logo.png';
import '../style.css';

const LoginButton = ({ title, className }) => {
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
      <Button className={className || 'loginBtn'} type="primary" onClick={showModal}>
        {title}
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
};

LoginButton.defaultProps = {
  className: '',
};
export default LoginButton;
