import React from 'react';
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

import './style.css';

const Landing = () => (
  <>
    <div className="header-nav-holder">
      <Navbar />
      <Header />
    </div>
    <HowNovaWork />
    <Resources />
    <Partner />
    <IntreviewerApp />
    <ActiveMembers />
    <Challenges />
    <ClientReviews />
    <Footer />
  </>
);

export default Landing;
