'use client';

import dynamic from 'next/dynamic';

const LoginView = dynamic(() => import('@/views/Login'), { ssr: false });

export default function LoginPage(): React.ReactElement {
  return <LoginView />;
}
