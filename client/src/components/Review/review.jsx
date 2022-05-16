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
    const source = axios.CancelToken.source();
    try {
      const getReviews = async () => {
        const { data: { data } } = await axios.get('/api/user/review', { cancelToken: source.token });
        setReviews(data.reviews);
      };
      getReviews();
    } catch ({ Response: { data: { message: msg } } }) {
      message.error(msg);
    }
    return () => {
      source.cancel();
    };
  }, [reviews]);

  const handleSave = async (interviewId) => {
    try {
      const { message: savedMsg } = await axios.patch(`/api/user/interview/review/${interviewId}`);
      if (savedMsg === 'Successfully updated!') {
        setSaved(!saved);
      }
    } catch ({ Response: { data: { message: msg } } }) {
      message.error(msg);
    }
  };

  return (
    <div className="review-tab">
      {reviews.length > 0 ? reviews.map((review) => (
        <>
          <div className="filter-holder">
            <Select defaultValue="all" style={{ width: 120 }} value={filterVal} onChange={(value) => setFilterVal(value)}>
              <Option value="all">all</Option>
              <Option value="saved">saved</Option>
            </Select>
          </div>
          <Comment
            actions={[
              <Tooltip key="comment-basic-like" title="Save">
                <button type="button" onClick={() => handleSave(review.id)} className="saved-btn">
                  {saved ? <StarFilled /> : <StarOutlined />}
                </button>
              </Tooltip>,
            ]}
            author={review.interviewerName}
            avatar={<Avatar src={review.interviewerImage} alt="Han Solo" />}
            content={(
              <p>
                {review.review.message}
                .
              </p>
            )}
            datetime={(
              <Tooltip>
                <span>{review.review.created_at}</span>
              </Tooltip>
            )}
          />

        </>
      )) : (<div className="alert alert-primary"> There is no reviews until now </div>) }
    </div>
  );
};
export default ReviewCard;
