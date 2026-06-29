import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import NationwideMap from './components/NationwideMap';
import FeaturesBento from './components/FeaturesBento';
import JourneyTimeline from './components/JourneyTimeline';
import PartnersMarquee from './components/PartnersMarquee';
import LabCentreShowcase from './components/LabCentreShowcase';
import ServicePlans from './components/ServicePlans';
import FAQAccordion from './components/FAQAccordion';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <NationwideMap />
        <FeaturesBento />
        <JourneyTimeline />
        <PartnersMarquee />
        <LabCentreShowcase />
        <ServicePlans />
        <FAQAccordion />
      </main>
      <Footer />
    </>
  );
}

export default App;
