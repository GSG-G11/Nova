import React from 'react';
import { Result } from 'antd';
import { Link } from 'react-router-dom';
import './style.css';

const NotFound = () => (
  <div className="not-found">
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
    />
    <Link className="not-found-btn" to="/">Back Home</Link>
  </div>
);

export default NotFound;
