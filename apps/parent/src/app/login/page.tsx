import { redirect } from 'next/navigation';

// Fallback: redirect /login → /vi/login (default locale)
export default function LoginRedirect() {
  redirect('/vi/login');
}
