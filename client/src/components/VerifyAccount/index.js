import React, { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';
import VerifyResult from './VerifyResult';

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
        {loading
          && <LoadingSpinner />}
        <VerifyResult
          verified={verified}
        />

      </div>

    </section>
  );
};

export default VerifyAccount;
