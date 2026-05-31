import React from 'react';
import { Hero } from './Hero';
import { StatsBar } from './StatsBar';
import { EnvironmentSection } from './EnvironmentSection';
import { TechnologySection } from './TechnologySection';
import { EnrollmentSection } from './EnrollmentSection';
import { ContactSection } from './ContactSection';

export function LandingView(): React.ReactElement {
  return (
    <>
      <Hero />
      <StatsBar />
      <EnvironmentSection />
      <TechnologySection />
      <EnrollmentSection />
      <ContactSection />
    </>
  );
}
