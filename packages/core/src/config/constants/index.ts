const isBrowser = typeof window !== 'undefined';

export const SOCKET_URL = 
  process.env.NEXT_PUBLIC_SOCKET_URL || 
  (isBrowser ? window.location.origin : 'http://localhost:5000');
