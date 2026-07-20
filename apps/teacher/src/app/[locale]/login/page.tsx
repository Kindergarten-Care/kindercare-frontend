import React from 'react';
import { LoginView } from '@/views/Login';

// The layout already sets the metadata for this route (Đăng nhập giáo viên | KinderCare)
// so we don't need to define metadata here again.

export default function LoginPage(): React.ReactElement {
  return <LoginView />;
}
