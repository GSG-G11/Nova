import {
  Table, Space, Button, message, Modal,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './style.css';
import PropTypes from 'prop-types';
import AddReviewButton from './AddReviewButton';

const { Column } = Table;
const UpcomingAndHistoryInterviews = ({ status }) => {
  const { user } = useSelector((state) => state.auth);
  const [dataSource, setDataSource] = useState([]);
  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  const deleteInterview = async (id) => {
    try {
      await axios.delete(`/api/interview/${id}`);
      setDataSource((prev) => prev.filter((item) => item.key !== id));
    } catch ({ response: { data: { message: msg } } }) {
      message.error(msg);
    }
  };

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    const fetchData = async () => {
      try {
        const { data: { data, count } } = await axios.get(`/api/users/interview?status=${status}&&page=${page}`, { cancelToken: source.token });
        if (page === 1) {
          setPageNumber(count);
        }
        setDataSource([]);
        data.forEach(async (obj) => {
          const { data: { data: { name } } } = (user.role === 'interviewee') ? await axios.get(`/api/user/info/${obj.interviews.interviewerId}`, { cancelToken: source.token })
            : await axios.get(`/api/user/info/${obj.interviews.intervieweeId}`, { cancelToken: source.token });
          const date = new Date(obj.interviews.date);
          const dateStr = `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`;
          setDataSource((prev) => [...prev, {
            key: obj.interviews._id,
            Name: name,
            questionCategory: obj.interviews.questionCategory,
            language: obj.interviews.language,
            specialization: obj.interviews.specialization,
            date: dateStr,
            time: `${`${obj.interviews.time}:00`}-${obj.interviews.time + 1}:00`,
          },
          ]);
        });
      } catch ({ response: { data: { message: msg } } }) {
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
      pagination={{
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
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Button type="primary" key={record.key} danger>
                {/* Here we must send to backend when the route is ready */}
                Cancel Interview
              </Button>
            </Space>
          )}
        />
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
