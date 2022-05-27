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
      <div className="header-nav-holder">
        <Navbar profilePicture={profilePicture} />
        <Header />
      </div>
      <HowNovaWork />
      <ActiveMembers />
      <ClientReviews />
      <Resources />
      <Partner />
      <Challenges />
      <IntreviewerApp />
      <Footer />
    </>
  );
};

export default Landing;
