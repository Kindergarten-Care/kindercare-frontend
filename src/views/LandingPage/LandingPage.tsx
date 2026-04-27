'use client';

import React from 'react';
import { MainContainer } from './styles';
import Header from '@/layout/Header';
import Footer from '@/layout/Footer';
import { Hero } from './components/Hero';
import { Facilities } from './components/Facilities';
import { AppFeatures } from './components/AppFeatures';
import { Enrollment } from './components/Enrollment';
import { ContactForm } from './components/ContactForm';

export const LandingPage: React.FC = () => {
  return (
    <MainContainer>
      <Header />
      <Hero />
      <Facilities />
      <AppFeatures />
      <Enrollment />
      <ContactForm />
      <Footer />
    </MainContainer>
  );
};

export default LandingPage;
