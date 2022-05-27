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
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

const { Column } = Table;
const { confirm } = Modal;

const AdminTables = ({ pageLocation, roles }) => {
  const [dataSource, setDataSource] = useState([]);
  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);

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
      if (state === 'APPROVED') {
        return setDataSource((prev) => prev.filter((item) => item.key !== id));
      }
      return setDataSource((prev) => prev.map((item) => {
        if (item.key !== id) {
          return item;
        }

        return {
          ...item,
          status: state,
        };
      }));
    } catch ({ response: { data: { message: msg } } }) {
      return message.error(msg);
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
  }, [pageLocation, roles]);

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    let endPoint;

    switch (pageLocation) {
      case 'Interviewers':
        endPoint = `/api/admin/users?role=${roles}&status=APPROVED&page=${page}`;
        break;
      case 'Interviewees':
        endPoint = `/api/admin/users?role=${roles}&page=${page}`;
        break;
      default:
        endPoint = `/api/admin/users?role=${roles}&status=PENDING&status=REJECTED&page=${page}`;
        break;
    }

    try {
      setLoading(true);
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
        setLoading(false);
      };
      fetchData();
    } catch ({ response: { data: { message: msg } } }) {
      setLoading(false);
      setDataSource([]);
      message.error(msg);
    }
    return () => source.cancel();
  }, [page, pageLocation, roles]);

  return (
    <Table
      dataSource={dataSource}
      className="table"
      loading={loading}
      pagination={pageNumber > 7 && {
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
              <Column
                title="status"
                dataIndex="status"
                key="status"
                render={(state) => (
                  <>
                    {(state === 'APPROVED') && (
                    <Tag icon={<CheckCircleOutlined />} color="success">
                      {state}
                    </Tag>
                    )}
                    {(state === 'PENDING') && (
                    <Tag icon={<SyncOutlined spin />} color="processing">
                      {state}
                    </Tag>
                    )}
                    {(state === 'REJECTED') && (
                    <Tag icon={<CloseCircleOutlined />} color="error">
                      {state}
                    </Tag>
                    )}
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
        render={(text, { key, status }) => (
          <Space size="middle">
            {(pageLocation === 'Applications' && status === 'PENDING') && (
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
            )}
            <DeleteOutlined
              className="deleteIcon"
              onClick={() => showDeleteConfirm(key)}
              type="dashed"
              key={key}
            />
          </Space>

        )}
      />
    </Table>
  );
};

AdminTables.propTypes = {
  pageLocation: PropTypes.string.isRequired,
  roles: PropTypes.string.isRequired,
};

export default AdminTables;
