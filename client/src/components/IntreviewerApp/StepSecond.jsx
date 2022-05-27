import React from 'react';
import {
  Form, Radio, Input, Checkbox, Col, Row,
} from 'antd';
import PropTypes from 'prop-types';

const StepSecond = ({
  specialization, setSpecializations, languages, setLanguages, cv, setCVLink, level, setLevel,
}) => {
  const { Item } = Form;
  const { Group: RadioGroup } = Radio;
  const { Group: CheckboxGroup } = Checkbox;

  const optionsSpecialization = [
    {
      label: 'Frontend',
      value: 'FRONTEND',
    },
    {
      label: 'Security',
      value: 'SECURITY',
    },
    {
      label: 'Backend',
      value: 'BACKEND',
    },
    {
      label: 'DevOps',
      value: 'DEVOPS',
    },
    {
      label: 'Data Structure',
      value: 'DATA STRUCTURE',
    },
    {
      label: 'Full Stack',
      value: 'FULL STACK',
    },
  ];
  const optionsLang = [
    {
      label: 'JavaScript',
      value: 'JAVASCRIPT',
    },
    {
      label: 'C#',
      value: 'C#',
    },
    {
      label: 'PHP',
      value: 'PHP',
    },
    {
      label: 'GO',
      value: 'GO',
    },
    {
      label: 'Java',
      value: 'JAVA',
    },
    {
      label: 'PYTHON',
      value: 'PYTHON',
    },
    {
      label: 'RUBY',
      value: 'RUBY',
    },
  ];
  const optionsLevel = [
    {
      label: 'junior',
      value: 'JUNIOR',
    },
    {
      label: 'mid-level',
      value: 'MIDDLE',
    },
    {
      label: 'senior',
      value: 'SENIOR',
    },
    {
      label: 'Expert',
      value: 'EXPERT',
    },
    {
      label: 'Internship',
      value: 'INTERNSHIP',
    },
  ];
  return (
    <div className="secondStep-holder">
      <div className="displaynon-control">
        <Item
          name="Specialization"
          label="Specialization"
          rules={[
            {
              required: true,
              message: 'Please select your specialization',
            },
          ]}
        />
        <RadioGroup
          options={optionsSpecialization}
          onChange={({ target: { value } }) => setSpecializations(value)}
          value={specialization}
          optionType="button"
        />
        <Item />
        <Item
          name="level"
          label="Level"
          rules={[
            {
              required: true,
              message: 'Please select your Level of experience',
            },
          ]}
        />
        <RadioGroup
          options={optionsLevel}
          onChange={({ target: { value } }) => setLevel(value)}
          value={level}
          optionType="button"
        />
        <Item />
        <Item
          name="Languages"
          label="Languages"
          rules={[
            {
              required: true,
              message: 'Please select your languages',
            },
          ]}
        />
        <CheckboxGroup
          style={{
            width: '100%',
          }}
          onChange={(e) => setLanguages(e)}
          value={languages}
        >
          <Row>
            {optionsLang.map(({ label, value }) => (
              <Col span={8}>
                <Checkbox value={value}>{label}</Checkbox>
              </Col>
            ))}
          </Row>
        </CheckboxGroup>
        <Item />
      </div>
      <Item
        name="cv"
        label="CV Link"
        type="url"
        value={cv}
        onChange={({ target: { value } }) => setCVLink(value)}
        rules={[
          {
            required: true,
            message: 'Please submit your CV Link',
          },
        ]}
      >
        <Input placeholder="Please input your CV Url" value={cv} />
      </Item>
    </div>
  );
};

StepSecond.propTypes = {
  specialization: PropTypes.string.isRequired,
  setSpecializations: PropTypes.func.isRequired,
  languages: PropTypes.string.isRequired,
  setLanguages: PropTypes.func.isRequired,
  cv: PropTypes.string.isRequired,
  setCVLink: PropTypes.func.isRequired,
  level: PropTypes.string.isRequired,
  setLevel: PropTypes.string.isRequired,
};

export default StepSecond;
