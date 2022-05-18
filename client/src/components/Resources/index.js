import React from 'react';
import './style.css';
import SectionIntro from '../common/SectionIntro';
import icon0 from '../../assets/images/Resources/icon0.png';
import icon1 from '../../assets/images/Resources/icon1.png';
import icon2 from '../../assets/images/Resources/icon2.png';
import icon3 from '../../assets/images/Resources/icon3.png';
import ResourceCard from './ResourceCard';

const resourcesArray = [
  {
    image: icon0,
    title: 'Interactive',
    description: 'Practice job interviews anytime right with real-time collaborative environment.',
  },
  {
    image: icon1,
    title: 'Matching',
    description: 'Each practice peer is picked especially for you, based on availability, topics and target companies.',
  },
  {
    image: icon2,
    title: 'Question Bank',
    description: 'Full questions, answers and specific interviewing tips enable both you and your peer.',
  },
  {
    image: icon3,
    title: 'Tailored Reviews',
    description: 'Candidates can get immediate feedback on performance, with specific advice for your answers.',
  },
];
const Resources = () => (
  <section className="resources">
    <SectionIntro
      action="We Provide"
      title="Resources"
      description="Why Nova, what is it characterized by, and what does it offer you."
    />
    <div className="resources__cards">
      {resourcesArray.map(({ image, title, description }) => (
        <ResourceCard
          image={image}
          title={title}
          description={description}
        />
      ))}
    </div>
  </section>
);

export default Resources;
