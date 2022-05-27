import React, { useEffect } from 'react';
import { Typography } from 'antd';
import './style.css';
import { useLocation } from 'react-router-dom';
import Challenge from './Challenge';

const { Title } = Typography;

const challengesArray = [
  {
    id: 1,
    title: 'Sorted Lists',
    name: 'You are given the heads of two sorted linked lists. Merge the two lists in a one sorted list.',
    tag: 'easy',
    link: 'https://leetcode.com/problems/merge-two-sorted-lists/',
  },
  {
    id: 2,
    title: 'Palindromic Substrings',
    name: 'Given a string, return the number of palindromic substrings in it.',
    tag: 'medium',
    link: 'https://leetcode.com/problems/palindromic-substrings/',
  },
  {
    id: 3,
    title: 'Longest Valid Parentheses',
    name: 'Given a string containing just the characters, find the length of the longest parentheses.',
    tag: 'hard',
    link: 'https://leetcode.com/problems/longest-valid-parentheses/',
  },
];
const Challenges = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView();
      }
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      window.scrollTo(0, 0);
    };
  }, [location]);
  return (
    <section className="top-challenges" id="challenge">
      <Title level={3} className="top-challenges__title">Top Challenges</Title>
      <div className="top-challenges__cards">
        {challengesArray.map(({
          id, name, title, link, tag,
        }) => (
          <Challenge
            key={id}
            title={title}
            name={name}
            tag={tag}
            link={link}
          />
        ))}
      </div>
    </section>
  );
};
export default Challenges;
