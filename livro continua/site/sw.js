// Service Worker — O Peso da Gorja PWA
const CACHE_NAME = 'gorja-v1';
const OFFLINE_URL = '/index.html';

// Assets to cache on install
const PRECACHE = [
  '/',
  '/index.html',
  '/capitulos.html',
  '/personagens.html',
  '/galeria.html',
  '/mapa.html',
  '/linha-do-tempo.html',
  '/css/tema.css',
  '/js/site.js'
];

// Add all chapter pages
for(let i = 1; i <= 27; i++){
  PRECACHE.push('/cap' + i + '.html');
}

// Install — precache essential assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE).catch(err => {
        console.log('Some assets failed to cache:', err);
        // Cache what we can individually
        return Promise.allSettled(
          PRECACHE.map(url => cache.add(url).catch(() => {}))
        );
      });
    })
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch — cache first, then network, then offline page
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if(event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request).then(cached => {
      if(cached) return cached;
      
      return fetch(event.request).then(response => {
        // Cache successful responses
        if(response && response.status === 200){
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, clone);
          });
        }
        return response;
      }).catch(() => {
        // Offline — return cached index or basic offline message
        if(event.request.mode === 'navigate'){
          return caches.match(OFFLINE_URL) || caches.match('/index.html');
        }
        return new Response('Offline', {status: 503, statusText: 'Offline'});
      });
    })
  );
});
