import React from 'react';
import {
  Button, Modal, Form,
} from 'antd';
import StepOne from './Steps/StepOne';
import StepTwo from './Steps/StepTwo';
import StepThree from './Steps/StepThree';
import StepFour from './Steps/StepFour';
import './InterviewForm.css';

const InterviewForm = () => {
  const [visible, setVisible] = React.useState(true);
  const [formData, setFormData] = React.useState({
    step: 1,
    specialization: '',
    language: '',
    questionCategory: '',
    time: '',
    date: '',
    interviewerId: '',
  });

  const { step } = formData;

  const nextStep = () => {
    setFormData({ ...formData, step: step + 1 });
  };

  const prevStep = () => {
    setFormData({ ...formData, step: step - 1 });
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({ ...formData, [name]: checked ? value : checked });
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  console.log(formData);
  const renderSwitch = () => {
    switch (step) {
      case 1:
        return <StepOne handleChange={handleChange} formData={formData} title="Specialization" />;
      case 2:
        return <StepTwo handleChange={handleChange} formData={formData} title="Language" />;
      case 3:
        return <StepThree handleChange={handleChange} formData={formData} title="Question Category" />;
      case 4:
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
        {renderSwitch()}
      </Form>

      <div className="btns">
        {
          step === 1 ? <Button type="primary" onClick={() => setVisible(false)}> Cancel </Button> : (
            <>
              <Button type="primary" onClick={() => setVisible(false)}> Cancel </Button>
              <Button type="primary" onClick={() => prevStep()}> Previous </Button>
            </>
          )
        }

        {
            step === 4
              ? <Button type="primary" onClick={() => setVisible(false)}> Submit </Button>
              : <Button type="primary" onClick={() => nextStep()}> Next </Button>
        }
      </div>
    </Modal>
  );
};

export default InterviewForm;
