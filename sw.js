const CACHE_NAME = 'fenstercheck-v16';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './lib/react.production.min.js',
  './lib/react-dom.production.min.js',
  './lib/babel.min.js',
  './lib/xlsx.full.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // App-Shell (Navigationen): sofort aus dem Cache antworten, im Hintergrund
  // aktualisieren – neue Versionen erscheinen beim nächsten Öffnen, ohne dass
  // ein Cache-Bump nötig ist. Offline funktioniert unverändert.
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match('./index.html') || await cache.match('./');
      const network = fetch(event.request).then(res => {
        if (res && res.status === 200) {
          cache.put('./index.html', res.clone());
          cache.put('./', res.clone());
        }
        return res;
      }).catch(() => null);
      if (cached) { network.catch(() => {}); return cached; }
      const fresh = await network;
      return fresh || Response.error();
    })());
    return;
  }
  // Übrige Anfragen (Bibliotheken etc.): Cache-first.
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => cached);
    })
  );
});
