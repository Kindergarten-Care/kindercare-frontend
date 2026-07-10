importScripts('https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.10.0/firebase-messaging-compat.js');

// Fetch public Firebase config from the backend at service worker install time.
// The fetch uses the app origin so it goes through Next.js's /api proxy rewrite.
fetch('/api/notifications/firebase-config')
  .then(res => res.json())
  .then(({ data: config }) => {
    firebase.initializeApp(config);
    const messaging = firebase.messaging();

    messaging.onBackgroundMessage((payload) => {
      const title = payload.notification?.title ?? 'KinderCare';
      const options = {
        body:  payload.notification?.body ?? '',
        icon:  '/logo.png',
        data:  payload.data,
        badge: '/logo.png',
      };
      self.registration.showNotification(title, options);
    });
  })
  .catch(err =>
    console.error('[SW] Failed to load Firebase config:', err)
  );
