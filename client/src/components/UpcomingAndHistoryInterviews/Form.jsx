import React from 'react';
import {
  Input, Form,
} from 'antd';
import PropTypes from 'prop-types';

const { TextArea } = Input;
const { Item } = Form;

const Forms = ({ review, setReview }) => {
  const onChange = (e) => {
    setReview(e.target.value);
  };
  return (
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
  );
};

Forms.propTypes = {
  setReview: PropTypes.func.isRequired,
  review: PropTypes.string.isRequired,
};
export default Forms;
