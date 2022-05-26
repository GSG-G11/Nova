import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../Header';
import Resources from '../Resources';
import HowNovaWork from '../HowNovaWork';
import Partner from '../Partner';
import ActiveMembers from '../ActiveMembers';
import IntreviewerApp from '../IntreviewerApp';
import ClientReviews from '../ClientReviews';
import Challenges from '../Challenges';
import Navbar from '../Navbar';
import Footer from '../common/Footer';

const Landing = () => {
  const user = useSelector((state) => state.auth.user);
  const profilePicture = user?.profilePicture;
  return (
    <>
      <Navbar profilePicture={profilePicture} />
      <Header />
      <Resources />
      <HowNovaWork />
      <Partner />
      <ActiveMembers />
      <IntreviewerApp />
      <Challenges />
      <ClientReviews />
      <Footer />
    </>
  );
};

export default Landing;
