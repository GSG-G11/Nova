import React from 'react';
import { Typography, Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoadingSpinner from '../../common/LoadingSpinner';

const { Title, Text } = Typography;

const VerifyResult = ({ verified }) => {
  const navigate = useNavigate();
  if (verified) {
    setTimeout(() => {
      navigate('/');
    }, 3000);
  }
  return verified ? (
    <Result
      status="success"
      title={(
        <Title level={3}>
          <Text>
            Your account has been verified
          </Text>
        </Title>
      )}
      subTitle={(
        <div className="verify-account__login">
          <Text>
            You can now login
          </Text>
          <LoadingSpinner />
          <Text>
            You are being redirected to the home page...
          </Text>
        </div>
      )}
    />
  ) : (
    <Result
      status="error"
      title={(
        <Title level={3}>
          <Text>
            Your account has not been verified
          </Text>
        </Title>
            )}
      subTitle={(
        <div className="verify-account__login">
          <Text>
            Please try again
          </Text>
          <Button type="primary" onClick={() => navigate('/')}>
            Back to home
          </Button>
        </div>
            )}
    />
  );
};

VerifyResult.propTypes = {
  verified: PropTypes.bool.isRequired,
};

export default VerifyResult;
