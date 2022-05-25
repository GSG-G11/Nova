import React from 'react';
import { Typography, Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LoginButton } from '../../Forms';

const { Title, Text } = Typography;

const VerifyResult = ({ verified }) => {
  const navigate = useNavigate();

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
          <LoginButton title="Login" />
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
