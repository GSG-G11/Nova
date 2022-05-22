import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Comment, Avatar, Tooltip, message, Select, Empty, Pagination,
} from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import './style.css';

const ReviewCard = () => {
  const { Option } = Select;
  const [reviewsArr, setReviews] = useState([]);
  const [filterVal, setFilterVal] = useState(null);
  const [current, setCurrent] = useState(1);

  const onChange = (page) => {
    setCurrent(page);
  };

  const handleSave = async (InterviewId) => {
    try {
      await axios.patch(
        `/api/user/interview/review/${InterviewId}`,
      );

      const newReview = reviewsArr.map((item) => {
        if (item.InterviewId === InterviewId) {
          // eslint-disable-next-line no-param-reassign
          (item.review.saved = !item.review.saved);
        }
        return item;
      });
      setReviews(newReview);
    } catch ({
      response: {
        data: { message: msg },
      },
    }) {
      message.error(msg);
    }
  };

  const starComponent = (save, InterviewId) => {
    if (save) {
      return (
        <StarFilled
          onClick={() => handleSave(InterviewId)}
          className="saved-btn"
        />
      );
    }
    return (
      <StarOutlined
        onClick={() => handleSave(InterviewId)}
        className="unsaved-btn"
      />
    );
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getReviews = async () => {
      const url = filterVal
        ? `/api/user/review?saved=${filterVal}&&page=${current}`
        : '/api/user/review';
      try {
        const {
          data: {
            data: { reviews },
          },
        } = await axios.get(url, { cancelToken: source.token });
        setReviews(reviews);
      } catch ({
        response: {
          data: { message: msg },
        },
      }) {
        message.error(msg);
      }
    };
    getReviews();
    return () => {
      source.cancel();
    };
  }, [filterVal, current]);

  return (
    <div className="review-tab">
      <div className="filter-holder">
        <Select
          defaultValue="all"
          className="filter-select"
          value={filterVal}
          onChange={(value) => setFilterVal(value)}
        >
          <Option>all</Option>
          <Option value="true">saved</Option>
          <Option value="false">unsaved</Option>
        </Select>
      </div>
      {reviewsArr.length > 0 ? (
        reviewsArr.map(
          ({
            interviewerName, interviewerImage, review, InterviewId,
          }) => (
            <Comment
              key={InterviewId}
              author={interviewerName}
              avatar={
                <Avatar src={interviewerImage} alt={interviewerName} />
              }
              content={(
                <>
                  <p>
                    { review.message ? review.message : 'No review for this interview !' }
                    .
                  </p>
                  {starComponent(review.saved, InterviewId)}
                </>
              )}
              datetime={(
                <Tooltip>
                  <span>{review.created_at}</span>
                </Tooltip>
              )}
            />
          ),
        )
      ) : (
        <Empty description={<span>No Reviews have been created yet!</span>} />
      )}
      <div className="pagination-holder">
        <Pagination defaultCurrent={1} total={50} current={current} onChange={onChange} />
      </div>
      ;
    </div>
  );
};
export default ReviewCard;
