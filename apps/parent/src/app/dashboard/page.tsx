import { redirect } from 'next/navigation';

// Fallback: redirect /dashboard → /vi/dashboard (default locale)
export default function DashboardRedirect() {
  redirect('/vi/dashboard');
}
