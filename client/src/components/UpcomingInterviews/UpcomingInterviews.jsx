import { Table, Tag, Space } from 'antd';
import React, { useEffect } from 'react';
import axios from 'axios';
import './UpcomingInterviews.css';

const { Column, ColumnGroup } = Table;

const data = [
  {
    key: '1',
    Name: 'John',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    Name: 'Jim',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    Name: 'Joe',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const UpcomingInterviews = () => {
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/users/interview?status=upcoming');
      console.log(result);
    };
    fetchData();
  }, []);
  return (
    <Table dataSource={data}>
      <ColumnGroup title="Title" dataIndex="Name" key="Name" />
      <Column title="Score" dataIndex="age" key="age" />
      <Column title="Interviewee Name" dataIndex="address" key="address" />
      <Column
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
      />
      <Column title="Date" dataIndex="address" key="address" />
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
