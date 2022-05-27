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
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();

  const onChange = (value) => {
    setPage(value);
  };

  const handleSave = async (interviewId) => {
    try {
      await axios.patch(
        `/api/user/interview/review/${interviewId}`,
      );

      setReviews((prevReview) => prevReview.map((item) => {
        if (item.interviewId === interviewId) {
          (item.review.saved = !item.review.saved);
        }
        return item;
      }));
    } catch ({
      response: {
        data: { message: msg },
      },
    }) {
      message.error(msg);
    }
  };

  const starComponent = (save, interviewId) => {
    if (save) {
      return (
        <StarFilled
          onClick={() => handleSave(interviewId)}
          className="saved-btn"
        />
      );
    }
    return (
      <StarOutlined
        onClick={() => handleSave(interviewId)}
        className="unsaved-btn"
      />
    );
  };

  useEffect(() => {
    setPage(1);
  }, [filterVal]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getReviews = async () => {
      const url = filterVal
        ? `/api/user/review?saved=${filterVal}&&page=${page}`
        : '/api/user/review';
      try {
        const {
          data: {
            data: { reviews, length },
          },
        } = await axios.get(url, { cancelToken: source.token });
        setReviews(reviews);
        setTotal(length);
      } catch ({
        response: {
          data: { message: msg },
        },
      }) {
        message.warning(msg);
      }
    };
    getReviews();
    return () => {
      source.cancel();
    };
  }, [filterVal, page]);

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
      {reviewsArr.length ? (
        reviewsArr.map(
          ({
            interviewerName, interviewerImage, review, interviewId,
          }) => (
            <Comment
              key={interviewId}
              author={interviewerName}
              avatar={
                <Avatar src={interviewerImage} alt={interviewerName} />
              }
              content={(
                <>
                  <p>
                    { review.message }
                    .
                  </p>
                  {starComponent(review.saved, interviewId)}
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
        { total > 3 && (
        <Pagination
          defaultCurrent={1}
          total={total}
          pageSize="3"
          current={page}
          onChange={onChange}
        />
        )}
      </div>
      ;
    </div>
  );
};
export default ReviewCard;
