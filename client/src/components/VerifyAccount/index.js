import React, { useEffect, useState } from 'react';
import {
  Typography, Result, message, Button,
} from 'antd';
import './style.css';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';

const { Text, Title } = Typography;
const VerifyAccount = () => {
  const [searchParams] = useSearchParams();
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    document.title = 'Verify Account';
    const { accessToken } = Object.fromEntries(searchParams);
    const verify = async () => {
      try {
        const { data: { message: incomingMessage } } = axios.patch('/api/auth/verify', {
          token: accessToken,
        }, {
          cancelToken: cancelToken.token,
        });

        message.success(incomingMessage);
        setVerified(true);
        setLoading(false);
      } catch ({ response: { data: msg } }) {
        message.error(msg);
      }
    };

    verify();

    return () => {
      cancelToken.cancel();
    };
  }, []);

  return (
    <section className="verify-account">
      <div className="verify-account__container">
        {loading ? (
          <LoadingSpinner />
        )
          : verified && (
            <Result
              status="success"
              title={(
                <Title level={3}>
                  <Text>
                    Your account has been verified.
                  </Text>
                </Title>
        )}
              subTitle={(
                <div className="verify-account__login">
                  <Text>
                    You can now login to your account.
                  </Text>
                  <Button type="primary">
                    Login
                  </Button>
                </div>
        )}
            />
          )}
      </div>

    </section>
  );
};

export default VerifyAccount;
