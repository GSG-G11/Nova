import React, { useState } from 'react';
import {
  Modal, Button, Input, message,
} from 'antd';
import './style.css';
import PropTypes from 'prop-types';
import axios from 'axios';

const { TextArea } = Input;

const AddReviewButton = ({ id }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [review, setReview] = useState('');

  const onChange = (e) => {
    setReview(e.target.value);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    setReview('');
    try {
      await axios.post(`/api/user/review/${id}`, { message: review });
    } catch ({ response: { data: { message: msg } } }) {
      message.error(msg);
    }
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
        <TextArea
          className="textArea"
          value={review}
          placeholder="Add your review here."
          onChange={onChange}
        />
      </Modal>
    </>
  );
};

AddReviewButton.propTypes = {
  id: PropTypes.string.isRequired,
};
export default AddReviewButton;
