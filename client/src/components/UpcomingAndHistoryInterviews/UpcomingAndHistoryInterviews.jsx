import {
  Table, Space, Button, message, Modal, Tag,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './style.css';
import PropTypes from 'prop-types';
import {
  CloseCircleOutlined,
} from '@ant-design/icons';
import AddReviewButton from './AddReviewButton';

const { Column } = Table;
const UpcomingAndHistoryInterviews = ({ status }) => {
  const { user } = useSelector((state) => state.auth);
  const [dataSource, setDataSource] = useState([]);
  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const deleteInterview = async (id) => {
    try {
      const { data: { message: msg } } = await axios.delete(`/api/interview/${id}`);
      message.success(msg);
      setDataSource((prev) => prev.filter((item) => item.key !== id));
    } catch ({ response: { data: { message: msg } } }) {
      message.error(msg);
    }
  };

  const cancelInterview = async (id) => {
    try {
      const { data: { message: msg } } = await axios.patch(`/api/${id}`);
      message.success(msg);
      setDataSource((prev) => prev.map((item) => {
        if (item.key === id) {
          item.is_cancelled = 'true';
        }
        return item;
      }));
    } catch ({ response: { data: { message: msg } } }) {
      message.error(msg);
    }
  };

  useEffect(() => {
    setLoading(true);
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    const fetchData = async () => {
      try {
        const { data: { data, count } } = await axios.get(`/api/users/interview?status=${status}&&page=${page}`, { cancelToken: source.token });
        if (page === 1) {
          setPageNumber(count);
        }
        setDataSource([]);
        setDataSource(data.map(({
          interviews: {
            _id, questionCategory, language, specialization, date,
            is_cancelled: isCancelled, time, meeting: { join_url: finalUrl },
          }, name,
        }) => ({
          key: _id,
          Name: name,
          questionCategory,
          language,
          specialization,
          date: (`${new Date(date).getDate()}/${(new Date(date).getMonth() + 1)}/${new Date(date).getFullYear()}`),
          is_cancelled: String(isCancelled),
          time: `${`${time}:00`}-${time + 1}:00`,
          finalUrl,
        })));
        setLoading(false);
      } catch ({ response: { data: { message: msg } } }) {
        setLoading(false);
        setDataSource([]);
        message.error(msg);
      }
      return () => source.cancel();
    };
    fetchData();
  }, [page]);

  return (
    <Table
      dataSource={dataSource}
      loading={loading}
      pagination={pageNumber > 3 && {
        current: page,
        pageSize: 3,
        total: pageNumber,
        onChange: (pageCh) => {
          setPage(pageCh);
        },
      }}
    >
      {user.role === 'interviewee' ? (
        <Column
          title="Interviewer Name"
          dataIndex="Name"
          key="Name"
        />
      )
        : <Column title="Interviewee Name" dataIndex="Name" key="Name" />}
      <Column title="Question category" dataIndex="questionCategory" key="questionCategory" />
      <Column title="Language" dataIndex="language" key="language" />
      <Column title="Specialization" dataIndex="specialization" key="specialization" />
      <Column title="Date" dataIndex="date" key="date" />
      <Column title="Time" dataIndex="time" key="time" />
      {(status === 'upcoming') ? (
        <>
          <Column
            title="Zoom Link"
            dataIndex=""
            key=""
            render={(text, record) => (
              <Button
                type="primary"
                key={record.key}
                onClick={() => {
                  const readyDate = new Date(record.date.split('/').reverse().join('-')).valueOf();
                  const today = new Date().valueOf();
                  if ((readyDate
                    + 60 * 60 * 1000
                  ) < today) {
                    message.error('You cannot join the meeting because the interview has already passed');
                  } else
                  if (record.is_cancelled === 'true') {
                    message.error('You cannot join the meeting because the interview has been cancelled');
                  } else {
                    window.open(record.finalUrl);
                  }
                }}
              >
                Join
              </Button>
            )}
          />
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <Space size="middle">
                {(record.is_cancelled === 'false') ? (
                  <Button
                    type="primary"
                    key={record.key}
                    danger
                    onClick={() => {
                      Modal.confirm({
                        title: 'Are you sure to cancel this interview?',
                        content: 'This action cannot be undone',
                        okText: 'Yes',
                        okType: 'danger',
                        cancelText: 'No',
                        onOk: () => cancelInterview(record.key),
                      });
                    }}
                  >
                    Cancel Interview
                  </Button>
                ) : (
                  <Tag icon={<CloseCircleOutlined />} color="error">
                    Canceled
                  </Tag>
                )}
              </Space>
            )}
          />

        </>
      ) : (
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <>
              {(user.role === 'interviewer') && <AddReviewButton key={record.key} id={record.key} />}
              <Space>
                <Button
                  className="delete"
                  key={record.key}
                  onClick={() => {
                    Modal.confirm({
                      title: 'Delete interview?',
                      content: 'Are you sure you want to delete this interview?',
                      async onOk() {
                        deleteInterview(record.key);
                      },
                    });
                  }}
                >
                  Delete
                </Button>
              </Space>
            </>
          )}
        />
      )}
    </Table>
  );
};

UpcomingAndHistoryInterviews.propTypes = {
  status: PropTypes.string.isRequired,
};

export default UpcomingAndHistoryInterviews;
