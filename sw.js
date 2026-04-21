const CACHE_NAME = 'life-planner-v2'; // Le subimos la versión a v2

const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/manifest.json'
];

// Se instala el Service Worker y guarda los archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
          console.log('Archivos guardados en caché correctamente');
          return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta las peticiones: Si no hay internet, saca los archivos del caché
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
          // Devuelve la versión guardada, o si hay internet, busca la más nueva
          return response || fetch(event.request);
      })
  );
});
