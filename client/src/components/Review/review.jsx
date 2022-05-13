import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Comment, Avatar, Tooltip, message,
} from 'antd';
import {
  StarOutlined, StarFilled,
} from '@ant-design/icons';
import './review.css';

const ReviewCard = () => {
  const [reviews, setReviews] = useState([]);
  const [saved, setSaved] = useState(false);

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

  const actions = [
    <Tooltip key="comment-basic-like" title="Save">
      <span>
        { saved === false ? <StarOutlined /> : <StarFilled />}
      </span>
    </Tooltip>,
  ];
  return (
    <div className="review-card">
      { reviews.length > 0 ? reviews.map((review) => (
        <Comment
          actions={actions}
          author="Han Solo"
          avatar={
            <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
          }
          content={(
            <p>
              {review.message}
              .
            </p>
          )}
        />
      )) : <div className="alert alert-primary"> There is no reviews until now </div>}
    </div>
  );
};
export default ReviewCard;
