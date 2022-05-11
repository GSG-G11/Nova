/* eslint-disable max-len */
import React from 'react';
import './UserInfo.css';
import { useSelector } from 'react-redux';

const UserInfo = () => {
  const { user: { role } } = useSelector((state) => state.auth);

  return (
    <div className="user__info-section">
      <div className="user__primary">
        <div className="user__image-container">
          <img src="https://i.ibb.co/rFVFSw0/Group-792.png" alt="" />
        </div>
        <div className="user__primary-info">
          <p className="user__name">James Ronald</p>
          <p className="user__specialization">Frontend</p>
          {role === 'interviewee' && (
          <button type="button" className="user__start-interview">
            Start a Practice Interview
          </button>
          )}
        </div>
      </div>

      <div className="user__secondary-info">
        <p className="user__about">About me</p>
        <p className="user__about-description">
          Hello. My name is James working as UI/UX designer. The user interactive UI design will help you and your website or app to convert the visitor to real customers and that will help you to make great revenue for your business...
        </p>
      </div>
    </div>
  );
};
export default UserInfo;
