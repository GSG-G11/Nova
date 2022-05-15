import { Modal, Button, Space } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const PopUpConfirm = ({ config, message }) => (
  <Space>
    <Button
      onClick={() => {
        Modal.confirm(config);
      }}
    >
      {message}
    </Button>

  </Space>

);

PopUpConfirm.propTypes = {
  config: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }).isRequired,
  message: PropTypes.string.isRequired,
};

export default PopUpConfirm;
