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

  const renderSwitch = () => {
    switch (step) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      case 4:
        return <StepFour />;
      default:
        return <StepOne />;
    }
  };
  return (
    <Modal
      visible={visible}
      footer={null}
      closable={false}
      className="interview-form"
    >
      <div className="interview-header">
        <p>Add Interview</p>
      </div>
      <p className="interview-modal-title">Create Interview</p>
      <Form>
        {renderSwitch()}
      </Form>

      <div className="btns">
        {
          step === 1 ? <Button type="primary" onClick={() => setVisible(false)}> Cancel </Button> : <Button type="primary" onClick={() => setStep(step - 1)}> Previous </Button>
        }

        {
            step === 3
              ? <Button type="primary" onClick={() => setVisible(false)}> Submit </Button>
              : <Button type="primary" onClick={() => setStep(step + 1)}> Next </Button>
        }
      </div>
    </Modal>
  );
};

export default InterviewForm;
