import React from 'react';
import About from '../components/About';
import Skills from '../components/Skills';
import Footer from '../components/Footer';
import './Pages.css';

const Home = () => {
  return (
    <>
      <div className="page-container">
        <About />
        <Skills />
      </div>
      <Footer />
    </>
  );
};

export default Home;
