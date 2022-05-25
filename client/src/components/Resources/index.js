import React, { useEffect } from 'react';
import './style.css';
import { useLocation } from 'react-router-dom';
import SectionIntro from '../common/SectionIntro';
import icon0 from '../../assets/images/Resources/icon0.png';
import icon1 from '../../assets/images/Resources/icon1.png';
import icon2 from '../../assets/images/Resources/icon2.png';
import icon3 from '../../assets/images/Resources/icon3.png';
import ResourceCard from './ResourceCard';

const resourcesArray = [
  {
    id: 1,
    image: icon0,
    title: 'Interview Guides',
    description: 'We have a collection of interview guides to help you prepare for your interview.',
    link: 'https://www.techinterviewhandbook.org/software-engineering-interview-guide/',
  },
  {
    id: 2,
    image: icon1,
    title: 'All Problems',
    description: 'Full questions, answers and specific interviewing tips. All in one place.',
    link: 'https://www.fullstack.cafe/blog/coding-challenges-interview-questions',
  },
  {
    id: 3,
    image: icon2,
    title: 'Fast Track Courses',
    description: 'Learn to be a better programmer faster with our recommended fast track courses.',
    link: 'https://www.coursera.org/learn/cs-tech-interview',
  },
  {
    id: 4,
    image: icon3,
    title: 'Blog',
    description: 'Read our recommended blog to learn about the latest news and updates.',
    link: 'https://skillcrush.com/blog/technical-interviews/',
  },
];
const Resources = () => {
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
    <section className="resources" id="resources">
      <SectionIntro
        action="We Provide"
        title="Resources"
        description="Why Nova, what is it characterized by, and what does it offer you."
      />
      <div className="resources__cards">
        {resourcesArray.map(({
          image, title, description, link, id,
        }) => (
          <ResourceCard
            image={image}
            title={title}
            description={description}
            link={link}
            key={id}
          />
        ))}
      </div>
    </section>
  );
};
export default Resources;
