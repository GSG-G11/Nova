import React, { useState } from 'react';
import {
  Button,
  Modal,
} from 'antd';
import PropTypes from 'prop-types';
import logo from '../../../assets/images/logo.png';
// eslint-disable-next-line import/no-cycle
import SignupForm from './Form';
import '../style.css';

const SignupButton = ({ loginForm, className }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    loginForm();
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button className={className || 'signUpBtn sign'} type="primary" onClick={showModal}>
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
        <SignupForm
          setIsModalVisible={setIsModalVisible}
        />
      </Modal>
    </>
  );
};

SignupButton.propTypes = {
  loginForm: PropTypes.func.isRequired,
  className: PropTypes.string,
};

SignupButton.defaultProps = {
  className: '',
};

export default SignupButton;
