import React, { useState } from 'react';
import './style.css';
import { Typography, Button, Modal } from 'antd';
import ScreenImg from '../../assets/images/joinus.png';
import InterviewerApp from './InterviewerApp';
import logo from '../../assets/images/logo.png';

const { Title } = Typography;

const IntreviewerApp = () => {
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

    <div className="intreviewer-app">
      <div className="heading">
        <Title level={4} className="main-title">Get Our Application</Title>
        <Title level={2} className="sub-title">You Can Easily Join Our Team…!</Title>
        <Title level={5} className="description-title">Help us on our quest to make good software even better.</Title>
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
      </div>

      <div className="intreviewer-content-item">
        <img src={ScreenImg} alt="brandsImg" className="ScreenImg" />
      </div>
    </div>
  );
};

export default IntreviewerApp;
