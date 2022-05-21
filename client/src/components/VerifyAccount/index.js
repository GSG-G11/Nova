import React from 'react';
import { Typography } from 'antd';
import './style.css';
import verifyImage from '../../assets/images/verify.svg';

const { Text, Title } = Typography;
const VerifyAccount = () => (
  <section className="verify-account">
    <div className="verify-account__container">
      <div className="verify-account__container-title">
        <Title level={2}>Verify your account</Title>
      </div>
      <div className="verify-account__container-image">
        <img
          src={verifyImage}
          alt="verify"
        />
      </div>
      <div className="verify-account__container-content">
        <Text className="verify-account__text">
          Please check your email to verify your account and enjoy our services.
        </Text>
      </div>
    </div>
  </section>
);

export default VerifyAccount;
