import React from 'react';
import { Tabs, Table, Button } from 'antd';
import './ProfileTabs.css';

const dataSource = [
  {
    key: '1',
    title: 'Interview 1',
    language: 'PHP',
    specialization: 'FRONTEND',
    interviewerName: 'Jim Green',
    questionCategory: 'Technical',
    date: '2020-01-01',
  },
  {
    key: '2',
    title: 'Interview 2',
    language: 'JS',
    specialization: 'BACKEND',
    interviewerName: 'Fawzi',
    questionCategory: 'Analytical',
    date: '2020-02-01',
  },
  {
    key: '3',
    title: 'Interview 3',
    language: 'RUBY',
    specialization: 'BACKEND',
    interviewerName: 'Ahmed',
    questionCategory: 'SYSTEM DESIGN',
    date: '2022-11-01',
  },
];

const columns = [
  {
    title: 'TITLE',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'LANGUAGE',
    dataIndex: 'language',
    key: 'language',
  },
  {
    title: 'SPECIALIZATION',
    dataIndex: 'specialization',
    key: 'specialization',
  },
  {
    title: 'INTERVIEWER NAME',
    dataIndex: 'interviewerName',
    key: 'interviewerName',
  },
  {
    title: 'QUESTION CATEGORY',
    dataIndex: 'questionCategory',
    key: 'questionCategory',
  },
  {
    title: 'DATE',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'ACTION',
    dataIndex: 'action',
    key: 'action',
    render: () => (
      <div>
        <Button type="danger">Cancel</Button>
      </div>
    ),
  },
];

const ProfileTabs = () => (
  <div>
    <Tabs defaultActiveKey="1" className="Tabs__section" centered>
      <Tabs.TabPane tab="Upcoming interviews" key="1" defaultActiveKey className="Tab__header">
        <Table columns={columns} dataSource={dataSource} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Reviews" key="2">
        Content of Tab Pane 2
      </Tabs.TabPane>
      <Tabs.TabPane tab="Settings" key="3">
        Content of Tab Pane 3
      </Tabs.TabPane>
      <Tabs.TabPane tab="Interviews history" key="4">
        Content of Tab Pane 4
      </Tabs.TabPane>
    </Tabs>
  </div>
);

export default ProfileTabs;
