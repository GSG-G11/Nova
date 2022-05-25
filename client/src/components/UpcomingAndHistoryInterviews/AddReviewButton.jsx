import React, { useState } from 'react';
import {
  Modal, Button, Input, message, Form,
} from 'antd';
import './style.css';
import PropTypes from 'prop-types';
import axios from 'axios';

const { TextArea } = Input;
const { Item } = Form;

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
    try {
      if (review.length > 0) {
        const { data: { message: msg } } = await axios.post(`/api/user/review/${id}`, { message: review });
        setReview('');
        return message.success(msg);
      }
      return message.error('Please enter your review');
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
        <Form
          name="basic"
          labelCol={{
            span: 20,
          }}
          wrapperCol={{
            span: 25,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Item
            label="Review"
            name="review"
            rules={[
              {
                required: true,
                message: 'Please input your review!',
              },
            ]}
          >
            <TextArea
              className="textArea"
              value={review}
              placeholder="Add your review here."
              onChange={onChange}
            />
          </Item>
        </Form>
      </Modal>
    </>
  );
};

AddReviewButton.propTypes = {
  id: PropTypes.string.isRequired,
};
export default AddReviewButton;
