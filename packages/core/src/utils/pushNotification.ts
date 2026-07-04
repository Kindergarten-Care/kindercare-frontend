import type { MessagePayload } from 'firebase/messaging';
import { notificationService } from '../services/NotificationService';

const SW_PATH = '/firebase-messaging-sw.js';
const SESSION_TOKEN_KEY = 'kc_fcm_token';

let initialized = false;

export async function initPushNotification(): Promise<void> {
  // Guard: browser-only, requires Service Worker support
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

  // Run only once per page session even if called multiple times (React StrictMode safe)
  if (initialized) return;
  initialized = true;

  try {
    // 1. Fetch public Firebase client config from backend
    const config = await notificationService.getFirebaseConfig();

    // 2. Dynamic imports keep firebase/messaging out of the SSR bundle entirely
    const { initializeApp, getApps, getApp } = await import('firebase/app');
    const { getMessaging, getToken, onMessage } = await import('firebase/messaging');

    // 3. Reuse existing Firebase app instance if already initialized (StrictMode-safe)
    const app = getApps().length ? getApp() : initializeApp(config);
    const messaging = getMessaging(app);

    // 4. Request browser notification permission
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.log('[FCM] Notification permission not granted.');
      return;
    }

    // 5. Register service worker and obtain FCM token
    const swRegistration = await navigator.serviceWorker.register(SW_PATH);
    const currentToken = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: swRegistration,
    });

    if (!currentToken) {
      console.warn('[FCM] Could not retrieve messaging token.');
      return;
    }

    // 6. Only sync to backend when token is new or changed (avoids redundant calls on page refresh)
    const cachedToken = sessionStorage.getItem(SESSION_TOKEN_KEY);
    if (currentToken !== cachedToken) {
      await notificationService.registerToken(currentToken);
      sessionStorage.setItem(SESSION_TOKEN_KEY, currentToken);
    }
    console.log('[FCM] Device token registered.');

    // 7. Handle foreground push messages while the app is open
    onMessage(messaging, (payload: MessagePayload) => {
      console.log('[FCM] Foreground message received:', payload);
      if (payload.notification?.title) {
        window.dispatchEvent(
          new CustomEvent('kc:push:message', { detail: payload }),
        );
      }
    });
  } catch (error) {
    console.warn('[FCM] Push notification unavailable — server may be offline');
  }
}
