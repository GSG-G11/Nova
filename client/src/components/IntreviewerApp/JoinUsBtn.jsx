import React, { useState } from 'react';
import './style.css';
import { Button, Modal } from 'antd';
import InterviewerApp from './InterviewerApp';
import logo from '../../assets/images/logo.png';

const JoinUsBtn = () => {
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
      <Button type="primary" className="joinUs-btn" onClick={showModal}>Join Us Now !</Button>
      <Modal
        title={(
          <div className="modal-logo-img">
            <img src={logo} alt="logo" className="logo-img" />
          </div>
          )}
        visible={isModalVisible}
        footer={null}
        onOk={handleOk}
        onCancel={handleCancel}
        className="modal-App"
      >
        <InterviewerApp setIsModalVisible={setIsModalVisible} />
      </Modal>

    </>
  );
};

export default JoinUsBtn;
