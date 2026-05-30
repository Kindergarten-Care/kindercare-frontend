'use client';

import React from 'react';
import { Navbar, Footer } from '@/layout';
import { LandingView } from '@/views/landing';
import { LocaleProvider, useTranslation } from '@kindercare/ui';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const VISUALLY_HIDDEN: React.CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

function LandingContent(): React.ReactElement {
  const { t } = useTranslation();
  return (
    <>
      <Navbar />
      <main>
        <h1 style={VISUALLY_HIDDEN}>{t('Landing.Meta.h1')}</h1>
        <LandingView />
      </main>
      <Footer />
    </>
  );
}

export default function LandingPage({ params }: PageProps): React.ReactElement {
  const { locale } = React.use(params);
  const validatedLocale = locale === 'en' ? 'en' : 'vi';

  return (
    <LocaleProvider defaultLocale={validatedLocale}>
      <LandingContent />
    </LocaleProvider>
  );
}
