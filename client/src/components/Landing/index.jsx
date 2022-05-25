import React from 'react';
import Header from '../Header';
import Resources from '../Resources';
import HowNovaWork from '../HowNovaWork';
import Partner from '../Partner';
// import ActiveMembers from '../ActiveMembers';
import IntreviewerApp from '../IntreviewerApp';
import ClientReviews from '../ClientReviews';
import Challenges from '../Challenges';
import Navbar from '../Navbar';
import Footer from '../common/Footer';

const Landing = () => (
  <>
    <Navbar />
    <Header />
    <Resources />
    <HowNovaWork />
    <Partner />
    {/* <ActiveMembers /> */}
    <IntreviewerApp />
    <Challenges />
    <ClientReviews />
    <Footer />
  </>
);

export default Landing;
