import React, { useEffect, useState } from 'react';
import {
  Typography, Result, Button,
} from 'antd';
import './style.css';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';
import { LoginButton } from '../Forms';

const { Text, Title } = Typography;
const VerifyAccount = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    document.title = 'Verify Account';
    const { accessToken } = Object.fromEntries(searchParams);
    const verify = async () => {
      try {
        await axios.patch('/api/auth/verify', {
          token: accessToken,
        }, {
          cancelToken: cancelToken.token,
        });

        setVerified(true);
        setLoading(false);
      } catch ({ response: { data: msg } }) {
        setVerified(false);
        setLoading(false);
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
          : (
            <Result
              status={verified ? 'success' : 'error'}
              title={(
                <Title level={3}>
                  <Text>
                    {verified ? 'Your account has been verified' : 'Your account could not be verified'}
                  </Text>
                </Title>
        )}
              subTitle={(
                <div className="verify-account__login">
                  <Text>
                    {verified ? 'You can now login' : 'Please try again'}
                  </Text>
                  {
                    verified ? (
                      <LoginButton />
                    )
                      : (
                        <Button
                          type="primary"
                          onClick={() => navigate('/')}
                        >
                          Back to home
                        </Button>
                      )
                  }
                </div>
        )}
            />
          )}
      </div>

    </section>
  );
};

export default VerifyAccount;
