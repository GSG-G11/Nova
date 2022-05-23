import {
  message, Space, Table, Tag, Modal, Button,
} from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './style.css';
import PropTypes from 'prop-types';
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

const { Column } = Table;
const { confirm } = Modal;

const AdminTables = ({ status }) => {
  const [dataSource, setDataSource] = useState([]);
  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/admin/users/${id}`);
      setDataSource((prev) => prev.filter((item) => item.key !== id));
    } catch (error) {
      message.error(error);
    }
  };

  const acceptUser = async (id, state) => {
    try {
      await axios.patch(`/api/admin/approval/${id}`, { status: state });
      setDataSource((prev) => prev.filter((item) => item.key !== id));
    } catch (error) {
      message.error(error);
    }
  };

  const showDeleteConfirm = (id, state) => {
    confirm({
      title: 'Delete user',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure to delete this user?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        if (!state) {
          return deleteUser(id);
        }
        return acceptUser(id, state);
      },
    });
  };

  const showAcceptConfirm = (id, state) => {
    confirm({
      title: 'Accept user',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to accept this user?',
      onOk: async () => {
        acceptUser(id, state);
      },
    });
  };

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    try {
      const fetchData = async () => {
        const { data: { data, count } } = await axios.get(`/api/admin/users?role=interviewer&limit=3&status=${status}&page=${page}`, {
          cancelToken: source.token,
        });
        if (page === 1) {
          setPageNumber(count);
        }
        setDataSource([]);
        data.forEach((obj) => {
          setDataSource((prev) => [...prev, {
            key: obj.userId,
            languages: obj.languages,
            specialization: obj.specialization,
            status: obj.status,
            Name: obj.userInfo[0].name,
            email: obj.userInfo[0].email,
            cv: obj.userInfo[0].cv,
            level: obj.userInfo[0].level,
            img: obj.userInfo[0].profile_picture,
          }]);
        });
      };
      fetchData();
    } catch (error) {
      setDataSource([]);
      message.error(error);
    }
    return () => source.cancel();
  }, [page, status]);

  return (
    <Table
      dataSource={dataSource}
      className="table"
      pagination={{
        current: page,
        pageSize: 3,
        total: pageNumber,
        onChange: (pageCh) => {
          setPage(pageCh);
        },
      }}
    >
      <Column title="Name" dataIndex="Name" key="Name" />
      <Column title="email" dataIndex="email" key="email" />
      <Column
        title="specialization"
        dataIndex="specialization"
        key="specialization"
      />
      <Column
        title="languages"
        dataIndex="languages"
        key="languages"
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
      <Column
        title="cv"
        dataIndex="cv"
        key="cv"
        render={(text, { cv }) => (
          <a href={cv} target="_blank" rel="noreferrer">
            {cv}
          </a>
        )}
      />
      <Column title="level" dataIndex="level" key="level" />
      <Column
        title="Action"
        key="action"
        render={(text, { key }) => (
          <Space size="middle">
            {status === 'PENDING' ? (
              <>
                <Button className="accept" onClick={() => showAcceptConfirm(key, 'APPROVED')}>
                  Accept
                </Button>
                <Button className="reject" onClick={() => showAcceptConfirm(key, 'REJECTED')}>
                  Reject
                </Button>
              </>
            ) : (
              <DeleteOutlined className="deleteIcon" onClick={() => showDeleteConfirm(key)} type="dashed" key={key} />
            )}
          </Space>
        )}
      />
    </Table>
  );
};

AdminTables.propTypes = {
  status: PropTypes.string.isRequired,
};

export default AdminTables;
