import {
  message, Space, Table, Tag, Modal, Button, Avatar,
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

const AdminTables = ({ status, roles }) => {
  const [dataSource, setDataSource] = useState([]);
  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/admin/users/${id}`);
      setDataSource((prev) => prev.filter((item) => item.key !== id));
    } catch ({ response: { data: { message: msg } } }) {
      message.error(msg);
    }
  };

  const acceptUser = async (id, state) => {
    try {
      await axios.patch(`/api/admin/approval/${id}`, { status: state });
      setDataSource((prev) => prev.filter((item) => item.key !== id));
    } catch ({ response: { data: { message: msg } } }) {
      message.error(msg);
    }
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: 'Delete user',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure to delete this user?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        deleteUser(id);
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
    setPage(1);
  }, [status, roles]);

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    const endPoint = (roles === 'interviewer') ? `/api/admin/users?role=${roles}&limit=7&status=${status}&page=${page}` : `/api/admin/users?role=${roles}&limit=3&page=${page}`;
    try {
      const fetchData = async () => {
        const { data: { data, count } } = await axios.get(endPoint, {
          cancelToken: source.token,
        });

        if (page === 1) {
          setPageNumber(count);
        }
        setDataSource(data.map(({
          userId, languages, specialization, status: sts, userInfo,
        }) => ({
          key: userId,
          languages: languages || [],
          specialization,
          status: sts,
          Name: userInfo[0].name,
          email: userInfo[0].email,
          cv: userInfo[0].cv,
          level: userInfo[0].level,
          img: userInfo[0].profile_picture,
        })));
      };
      fetchData();
    } catch ({ response: { data: { message: msg } } }) {
      setDataSource([]);
      message.error(msg);
    }
    return () => source.cancel();
  }, [page, status, roles]);

  return (
    <Table
      dataSource={dataSource}
      className="table"
      pagination={{
        current: page,
        pageSize: 7,
        total: pageNumber,
        onChange: (pageCh) => {
          setPage(pageCh);
        },
      }}
    >
      <Column
        title="Photo"
        dataIndex="img"
        key="img"
        render={(img) => (
          <Avatar src={img} />
        )}
      />
      <Column
        title="Name"
        dataIndex="Name"
        key="Name"
      />
      <Column
        title="email"
        dataIndex="email"
        key="email"
      />
      {(roles === 'interviewer')
          && (
            <>
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
            </>
          )}
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
      <Column
        title="level"
        dataIndex="level"
        key="level"
      />
      <Column
        title="Action"
        key="action"
        render={(text, { key }) => (
          <Space size="middle">
            {status === 'PENDING' ? (
              <>
                <Button
                  className="accept"
                  onClick={() => showAcceptConfirm(key, 'APPROVED')}
                >
                  Accept
                </Button>
                <Button
                  className="reject"
                  onClick={() => showAcceptConfirm(key, 'REJECTED')}
                >
                  Reject
                </Button>
              </>
            ) : (
              <DeleteOutlined
                className="deleteIcon"
                onClick={() => showDeleteConfirm(key)}
                type="dashed"
                key={key}
              />
            )}
          </Space>
        )}
      />
    </Table>
  );
};

AdminTables.propTypes = {
  status: PropTypes.string.isRequired,
  roles: PropTypes.string.isRequired,
};

export default AdminTables;
