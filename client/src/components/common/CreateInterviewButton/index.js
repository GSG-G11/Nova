import React, { useState } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import InterviewForm from '../../Forms/Interview/InterviewForm';

const CreateInterviewButton = ({ title }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <InterviewForm
        setVisible={setVisible}
        visible={visible}
      />
      <Button
        type="primary"
        className="btnBookInterview"
        onClick={() => setVisible(true)}
      >
        {title}
      </Button>
    </>
  );
};

CreateInterviewButton.propTypes = {
  title: PropTypes.string.isRequired,
};
export default CreateInterviewButton;
