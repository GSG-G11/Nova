import React, { useState } from 'react';
import {
  Modal, Button, message,
} from 'antd';
import './style.css';
import PropTypes from 'prop-types';
import axios from 'axios';
import Form from './Form';

const AddReviewButton = ({ id }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [review, setReview] = useState('');

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    try {
      const { data: { message: msg } } = await axios.post(`/api/user/review/${id}`, { message: review });
      setReview('');
      return message.success(msg);
    } catch ({ response: { data: { message: msg } } }) {
      message.error(msg);
    }
    return setReview('');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button className="addReview" type="primary" onClick={showModal}>
        Add review
      </Button>
      <Modal
        title="Review"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form review={review} setReview={setReview} />
      </Modal>
    </>
  );
};

AddReviewButton.propTypes = {
  id: PropTypes.string.isRequired,
};
export default AddReviewButton;
