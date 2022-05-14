// eslint-disable-next-line no-unused-vars
import { Table, Space } from 'antd';
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UpcomingInterviews.css';

const { Column } = Table;

const UpcomingInterviews = () => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('/api/users/interview?status=upcoming');
      if (data.message === 'Interviews fetched successfully!') {
        setDataSource([]);
        const { data: { data: { name } } } = await axios.get(`/api/user/info/${data.data[0].interviews.interviewerId}`);
        data.data.forEach((obj) => {
          setDataSource((prev) => [...prev, {
            // eslint-disable-next-line no-underscore-dangle
            key: obj.interviews._id,
            Name: name,
            questionCategory: obj.interviews.questionCategory,
            language: obj.interviews.language,
            specialization: obj.interviews.specialization,
            date: obj.interviews.date,
            time: obj.interviews.time,
          },
          ]);
        });
      }
    };
    fetchData();
  }, []);
  return (
    <Table dataSource={dataSource}>
      <Column title="Interviewer Name" dataIndex="Name" key="Name" />
      <Column title="Question category" dataIndex="questionCategory" key="questionCategory" />
      <Column title="Language" dataIndex="language" key="language" />
      <Column title="Specialization" dataIndex="specialization" key="specialization" />
      {/* <Column
        title="Question category"
        dataIndex="tags"
        key="tags"
        render={(tags) => (
          <>
            {tags.map((tag) => (
              <Tag color="blue" key={tag}>
                {tag}
              </Tag>
            ))}
          </>
        )}
      /> */}
      <Column title="Date" dataIndex="date" key="date" />
      <Column title="Time" dataIndex="time" key="time" />
      <Column
        title="Action"
        key="action"
        render={(text, record) => (
          <Space size="middle">
            <a href="/" key={record.key}>
              Cancel Interview
            </a>
          </Space>
        )}
      />
    </Table>
  );
};
export default UpcomingInterviews;
