import React from 'react';
import { Button, Modal, Form } from 'antd';
import StepOne from './Steps/StepOne';
import StepTwo from './Steps/StepTwo';
import StepThree from './Steps/StepThree';
import StepFour from './Steps/StepFour';
import './InterviewForm.css';

const InterviewForm = () => {
  const [step, setStep] = React.useState(1);
  const [visible, setVisible] = React.useState(true);
  const [formData, setFormData] = React.useState({
    specialization: '',
    language: '',
    questionCategory: '',
    time: '',
    date: '',
    interviewerId: '',
  });

  console.log(formData);

  const renderSwitch = () => {
    switch (step) {
      case 1:
        return <StepOne setFormData={setFormData} title="Specialization" />;
      case 2:
        return <StepTwo setFormData={setFormData} title="Language" />;
      case 3:
        return <StepThree title="Question Category" />;
      case 4:
        return <StepFour title="Available Time" />;
      default:
        return <StepOne title="Specialization" />;
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
      <Form>
        {renderSwitch()}
      </Form>

      <div className="btns">
        {
          step === 1 ? <Button type="primary" onClick={() => setVisible(false)}> Cancel </Button> : (
            <>
              <Button type="primary" onClick={() => setVisible(false)}> Cancel </Button>
              <Button type="primary" onClick={() => setStep(step - 1)}> Previous </Button>
            </>
          )
        }

        {
            step === 4
              ? <Button type="primary" onClick={() => setVisible(false)}> Submit </Button>
              : <Button type="primary" onClick={() => setStep(step + 1)}> Next </Button>
        }
      </div>
    </Modal>
  );
};

export default InterviewForm;
