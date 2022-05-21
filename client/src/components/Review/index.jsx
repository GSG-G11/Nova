import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Comment, Avatar, Tooltip, message, Select, Empty,
} from 'antd';
import {
  StarOutlined, StarFilled,
} from '@ant-design/icons';
import './style.css';

const ReviewCard = () => {
  const { Option } = Select;
  const [reviewsArr, setReviews] = useState([]);
  const [filterVal, setFilterVal] = useState('all');
  const starComponent = (save) => {
    if (save) {
      return <StarFilled />;
    }
    return <StarOutlined />;
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getReviews = async () => {
      try {
        const { data: { data: { reviews } } } = await axios.get(`/api/user/review?saved=${filterVal}`, { cancelToken: source.token });
        setReviews(reviews);
      } catch ({ Response: { data: { message: msg } } }) {
        message.error(msg);
      }
    };
    getReviews();
    return () => {
      source.cancel();
    };
  }, [filterVal]);

  const handleSave = async (interviewId) => {
    try {
      const { message: savedMsg } = await axios.patch(`/api/user/interview/review/${interviewId}`);
      message.success(savedMsg);
    } catch ({ Response: { data: { message: msg } } }) {
      message.error(msg);
    }
  };

  return (
    <div className="review-tab">
      {reviewsArr.length > 0 ? reviewsArr.map(({
        interviewerName, interviewerImage, id, review,
      }) => (
        <>
          <div className="filter-holder">
            <Select defaultValue="all" className="filter-select" value={filterVal} onChange={(value) => setFilterVal(value)}>
              <Option value="all">all</Option>
              <Option value="true">saved</Option>
              <Option value="false">unsaved</Option>
            </Select>
          </div>
          <Comment
            actions={[
              <Tooltip key="comment-basic-like" title="Save">
                <button type="button" onClick={() => handleSave(id)} className="saved-btn">
                  {starComponent(review.saved)}
                </button>
              </Tooltip>,
            ]}
            author={interviewerName}
            avatar={<Avatar src={interviewerImage} alt={review.interviewerName} />}
            content={(
              <p>
                {review.message}
                .
              </p>
            )}
            datetime={(
              <Tooltip>
                <span>{review.created_at}</span>
              </Tooltip>
            )}
          />

        </>
      )) : (<Empty     
        description={
        <span>
          No Reviews have been created yet!
        </span>
      }/>) }
    </div>
  );
};
export default ReviewCard;
