'use client';

import dynamic from 'next/dynamic';

const ForgotPasswordView = dynamic(() => import('@/views/ForgotPassword'), { ssr: false });

export default function ForgotPasswordPage(): React.ReactElement {
  return <ForgotPasswordView />;
}
