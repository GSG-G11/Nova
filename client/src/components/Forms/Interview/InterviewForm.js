import React, { useState } from 'react';
import {
  Button, Modal, Form, Popconfirm, Steps, message,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  StepFour, StepFive, Step as FormSteps,
} from './Steps';
import './InterviewForm.css';

const { Step } = Steps;
const InterviewForm = ({ visible, setVisible }) => {
  const [formData, setFormData] = useState({
    step: 0,
    specialization: '',
    language: '',
    questionCategory: '',
    time: '',
    date: '',
    interviewerId: '',
  });

  const { step } = formData;
  const [progressPercent, setProgressPercent] = useState(0);
  const [availableTime, setAvailableTime] = useState([]);
  const [loading, setLoading] = useState(false);

  const nextStep = () => {
    setFormData({ ...formData, step: step + 1 });
    setProgressPercent((step + 1) * 25);
  };

  const prevStep = () => {
    setFormData({ ...formData, step: step - 1 });
    setProgressPercent(25 * (step - 1));
  };
  const getAvailableTime = async () => {
    if (!formData.specialization || !formData.language || !formData.questionCategory) {
      message.error('Please select specialization, language and question category');
      return;
    }
    try {
      setLoading(true);
      nextStep();
      const { data: { data } } = await axios.post('/api/interview/available', {
        specialization: formData.specialization,
        language: formData.language,
      });
      setAvailableTime(data);
      setLoading(false);
    } catch ({ response: { data: { message: msg } } }) {
      message.error(msg);
    }
  };

  const submitInterview = async () => {
    if (!availableTime.length) {
      message.error('You can not submit interview request due to no available time');
      return;
    }
    if (!formData.date || !formData.time || !formData.interviewerId) {
      message.error('Please select time and date');
      return;
    }
    try {
      setLoading(true);
      nextStep();
      const { step: stepIgnored, ...rest } = formData;
      await axios.post('/api/interview', {
        ...rest,
      });
      setLoading(false);
    } catch ({ response: { data: { message: msg } } }) {
      message.error(msg);
      setLoading(false);
      setFormData({ ...formData, step: 0 });
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({ ...formData, [name]: checked ? value : checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    submitInterview();
  };

  const handleFirstStepSubmit = () => {
    getAvailableTime();
  };

  const CancelPop = (
    <Popconfirm
      className="pop"
      onConfirm={() => setVisible(false)}
      title="Are you sure？"
      okText="Yes"
      cancelText="No"
      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
    >
      <Button
        type="primary"
      >
        {' '}
        Cancel
        {' '}

      </Button>
    </Popconfirm>
  );

  const renderSwitch = () => {
    switch (step) {
      case 0:
        return <FormSteps handleChange={handleChange} formData={formData} title="Specialization" />;
      case 1:
        return <FormSteps handleChange={handleChange} formData={formData} title="Language" />;
      case 2:
        return <FormSteps handleChange={handleChange} formData={formData} title="Question Category" />;
      case 3:
        return (
          <StepFour
            handleChange={handleChange}
            formData={formData}
            setFormData={setFormData}
            title="Available Days"
            availableTime={availableTime}
            setAvailableTime={setAvailableTime}
            loading={loading}
          />
        );
      case 4:
        return <StepFive title="Congratulations" loading={loading} />;
      default:
        return <FormSteps handleChange={handleChange} formData={formData} title="Specialization" />;
    }
  };

  const renderButtons = () => {
    if (step === 0) {
      return {
        next: <Button type="primary" onClick={nextStep}> Next </Button>,
        cancel: CancelPop,
      };
    } if (step === 1) {
      return {
        next: <Button type="primary" onClick={nextStep}> Next </Button>,
        previous: <Button type="primary" onClick={prevStep}> Previous </Button>,
        cancel: CancelPop,
      };
    } if (step === 2) {
      return {
        next: <Button type="primary" disabled={loading} onClick={handleFirstStepSubmit}> Next </Button>,
        previous: <Button type="primary" onClick={prevStep}> Previous </Button>,
        cancel: CancelPop,
      };
    } if (step === 3) {
      return {
        submit: <Button type="primary" onClick={handleSubmit}> Submit </Button>,
        previous: <Button type="primary" onClick={prevStep}> Previous </Button>,
        cancel: CancelPop,
      };
    } if (step === 4) {
      return {
        submit:
  <Button
    type="primary"
    id="done"
    disabled={loading}
    onClick={() => {
      setVisible(false);
      setFormData({
        step: 0,
        specialization: '',
        language: '',
        questionCategory: '',
        time: '',
        date: '',
        interviewerId: '',
      });
    }}
  >
    Done
  </Button>,
        cancel: CancelPop,
      };
    }

    return {
      next: <Button type="primary" onClick={nextStep}> Next </Button>,
      previous: <Button type="primary" onClick={prevStep}> Previous </Button>,
      cancel: CancelPop,
    };
  };
  return (
    <Modal
      footer={null}
      closable={false}
      className="interview-form"
      visible={visible}
    >
      <p className="interview-modal-title">Create Interview</p>
      <Form onFinish={() => handleSubmit()}>
        <Steps current={step} className="form-steps" percent={progressPercent}>
          <Step title="Specialization" />
          <Step title="Language" />
          <Step title="Question Category" />
          <Step title="Available Days" />
          <Step title="Matched?" />
        </Steps>
        <Form onFinish={handleFirstStepSubmit}>
          {renderSwitch()}
        </Form>
      </Form>

      <div className="btns">
        {renderButtons().cancel}
        {renderButtons().previous}
        {renderButtons().next}
        {renderButtons().submit}
      </div>
    </Modal>
  );
};

InterviewForm.propTypes = {
  setVisible: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default InterviewForm;
