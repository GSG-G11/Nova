import React from 'react';
import {
  Form, Radio, Input, Checkbox, Col, Row,
} from 'antd';
import PropTypes from 'prop-types';

const StepSecond = ({
  specialization, setSpecializations, languages, setLanguages, cv, setCVLink, level, setLevel,
}) => {
  const { Item } = Form;

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
        <Radio.Group
          options={optionsSpecialization}
          onChange={(e) => setSpecializations(e.target.value)}
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
              message: 'Please select your Level of expertise',
            },
          ]}
        />
        <Radio.Group
          options={optionsLevel}
          onChange={(e) => setLevel(e.target.value)}
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
        <Checkbox.Group
          style={{
            width: '100%',
          }}
          onChange={(e) => setLanguages(e)}
          value={languages}
        >
          <Row>
            <Col span={8}>
              <Checkbox value="javascript">javascript</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="C#">C#</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="GO">GO</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="C++">C++</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="JAVA">JAVA</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="PYTHON">PYTHON</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="RUBY">RUBY</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="PHP">PHP</Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
        <Item />
      </div>
      <Item
        name="cv"
        label="CV Link"
        type="url"
        value={cv}
        onChange={(e) => setCVLink(e.target.value)}
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
