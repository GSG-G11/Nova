import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import Login from './Login';
import logo from '../../assets/Nova Logo.png';
import './Login.css';

function App() {
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
        <img className="logo" src={logo} alt="" />
        <Login />
      </Modal>
    </>
  );
}

export default App;
