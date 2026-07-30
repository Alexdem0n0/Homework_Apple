/* Simple offline cache for the Homework Tracker */
const CACHE = 'homework-tracker-v28';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './vendor/react.production.min.js',
  './vendor/react-dom.production.min.js',
  './vendor/babel.min.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

/* Live data that must never be served from the cache (exchange rates). */
const LIVE_HOSTS = ['dolarapi.com', 'pydolarve.org', 'exchangedyn.com'];

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  let host = '';
  try { host = new URL(e.request.url).hostname; } catch (err) { host = ''; }
  // let rate lookups go straight to the network, always fresh
  if (LIVE_HOSTS.some((h) => host === h || host.endsWith('.' + h))) return;
  e.respondWith(
    caches.match(e.request).then((cached) =>
      cached ||
      fetch(e.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match('./index.html'))
    )
  );
});
