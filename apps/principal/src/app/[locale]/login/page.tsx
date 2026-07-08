import React from 'react';
import { LoginView } from '@/views/Login';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Login' });
  return {
    title: `${t('portalLabel')}`,
  };
}

export default function LoginPage() {
  return <LoginView />;
}
