import React, { useState } from 'react';
import {
  Button, message, Steps, Form,
} from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';
import FirstStepForm from './StepFirst';
import StepSecond from './StepSecond';

const { Step } = Steps;
const InterviewerApp = ({ setIsModalVisible }) => {
  const [current, setCurrent] = useState(0);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [specialization, setSpecializations] = useState('Frontend');
  const [languages, setLanguages] = useState([]);
  const [cv, setCVLink] = useState('');
  const [level, setLevel] = useState('');
  const [loading, setLoading] = useState(false);
  const steps = [
    {
      title: '',
      content: <FirstStepForm
        fullName={fullName}
        setFullName={setFullName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirm={confirm}
        setConfirm={setConfirm}
      />,
    },
    {
      title: '',
      content: <StepSecond
        specialization={specialization}
        setSpecializations={setSpecializations}
        languages={languages}
        setLanguages={setLanguages}
        cv={cv}
        setCVLink={setCVLink}
        level={level}
        setLevel={setLevel}
      />,
    },
  ];
  const joinUs = async () => {
    if (fullName && email && password && confirm && specialization && languages && cv && level) {
      setLoading(true);
      try {
        const { data: { message: verifyMessage } } = await axios.post('/api/signup', {
          name: fullName,
          email,
          password,
          confirm,
          role: 'interviewer',
          specialization,
          languages,
          cv,
          level,
        });
        message.success(`Welcome ${fullName}, ${verifyMessage}`);
        setLoading(false);
        setIsModalVisible(false);
      } catch ({ response: { data: { message: msg } } }) {
        message.error(msg);
        setLoading(false);
      }
    } else {
      message.error('Please fill all fields');
    }
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div className="interviewerApp-holder">
      <Steps current={current}>
        {steps.map(({ title }) => (
          <Step key={title} title={title} />
        ))}
      </Steps>
      <div className="steps-content">
        <Form
          name="basic"
          labelCol={{
            span: 20,
          }}
          wrapperCol={{
            span: 25,
          }}
          className="signup-form joinUs-form"
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          {steps[current].content}
          {/* {loading ? (<LoadingSpinner />) : ()} */}
        </Form>
      </div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" loading={loading} htmlType="submit" onClick={() => joinUs()}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};
InterviewerApp.propTypes = {
  setIsModalVisible: PropTypes.func.isRequired,
};
export default InterviewerApp;
