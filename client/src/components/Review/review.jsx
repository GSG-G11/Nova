import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Comment, Avatar, Tooltip, message, Select,
} from 'antd';
import {
  StarOutlined, StarFilled,
} from '@ant-design/icons';
import './review.css';

const ReviewCard = () => {
  const { Option } = Select;
  const [reviews, setReviews] = useState([]);
  const [saved, setSaved] = useState(false);
  const [filterVal, setFilterVal] = useState('all');

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          '/api/user/review',
        );
        setReviews(response.data.reviews);
        setSaved(response.data.saved);
      } catch ({ Response: { data: { message: msg } } }) {
        message.error(msg);
      }
    })();
  }, [reviews]);

  const handleSave = async () => {
    try {
      const { message: savedMsg } = await axios.patch('/api/user/interview/review/:interviewId');
      if (savedMsg === 'Successfully updated!') {
        setSaved(!saved);
      }
    } catch ({ Response: { data: { message: msg } } }) {
      message.error(msg);
    }
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Save">
      <button type="button" onClick={handleSave}>
        {saved ? <StarFilled /> : <StarOutlined />}
      </button>
    </Tooltip>,
  ];
  return (
    <>
      <div className="filter-holder">
        <Select defaultValue="all" style={{ width: 120 }} value={filterVal} onChange={(value) => setFilterVal(value)}>
          <Option value="all">all</Option>
          <Option value="saved">saved</Option>
        </Select>
      </div>
      <div className="review-card">
        {reviews.length > 0 ? reviews.map((review) => (
          <Comment
            actions={actions}
            author="Han Solo"
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
            content={(
              <p>
                {review.message}
                .
              </p>
            )}
          />
        )) : <div className="alert alert-primary"> There is no reviews until now </div>}
        ,
      </div>

    </>
  );
};
export default ReviewCard;
