import React, { useState } from 'react';
import {
  Button, Modal, Form, Popconfirm, Steps,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import StepOne from './Steps/StepOne';
import StepTwo from './Steps/StepTwo';
import StepThree from './Steps/StepThree';
import StepFour from './Steps/StepFour';
import './InterviewForm.css';

const { Step } = Steps;
const InterviewForm = () => {
  const [visible, setVisible] = React.useState(true);
  const [formData, setFormData] = React.useState({
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

  const nextStep = () => {
    setFormData({ ...formData, step: step + 1 });
    setProgressPercent((step + 1) * 25);
  };

  const prevStep = () => {
    setFormData({ ...formData, step: step - 1 });
    setProgressPercent(25 * (step - 1));
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({ ...formData, [name]: checked ? value : checked });
  };

  const handleSubmit = () => {
    console.log(formData);
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
      <Button type="primary"> Cancel </Button>
    </Popconfirm>
  );

  console.log(formData);
  const renderSwitch = () => {
    switch (step) {
      case 0:
        return <StepOne handleChange={handleChange} formData={formData} title="Specialization" />;
      case 1:
        return <StepTwo handleChange={handleChange} formData={formData} title="Language" />;
      case 2:
        return <StepThree handleChange={handleChange} formData={formData} title="Question Category" />;
      case 3:
        return <StepFour handleChange={handleChange} formData={formData} title="Available Time" />;
      default:
        return <StepOne handleChange={handleChange} title="Specialization" />;
    }
  };
  return (
    <Modal
      visible={visible}
      footer={null}
      closable={false}
      className="interview-form"
    >
      <p className="interview-modal-title">Create Interview</p>
      <Form onFinish={handleSubmit}>
        <Steps current={step} className="form-steps" percent={progressPercent}>
          <Step title="Specialization" />
          <Step title="Language" />
          <Step title="Question Category" />
          <Step title="Available Time" />
        </Steps>
        {renderSwitch()}
      </Form>

      <div className="btns">
        {
          step === 0 ? CancelPop : (
            <>
              {CancelPop}
              <Button type="primary" onClick={() => prevStep()}> Previous </Button>
            </>
          )
        }

        {
            step === 3
              ? <Button type="primary" onClick={() => setVisible(false)}> Submit </Button>
              : <Button type="primary" onClick={() => nextStep()}> Next </Button>
        }
      </div>
    </Modal>
  );
};

export default InterviewForm;
