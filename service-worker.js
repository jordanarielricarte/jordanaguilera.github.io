var cacheName = "Mis Perris V3";
var filesToCache = [
    "/",
    "/index.html",
    "/formulario.html",
    "/galeria.html",
    "/login.html",
    "/JavaScript/app.js",
    "/JavaScript/ciudad.js",
    "/JavaScript/main.js",
    "/style/estilos.css",
    "/style/final.css",
    "/style/fontello.css",
    "/style/formulario.css",
    "/style/galeria.css",
    "/style/info.css",
    "/style/main.css",
    "/style/menu.css",
    "/style/newgaleria.css",
    "/imagenes/1.jpg",
    "/imagenes/2.jpg",
    "/imagenes/3.jpg",
    "/imagenes/galeria1.jpg",
    "/imagenes/galeria2.jpg",
    "/imagenes/galeria3.jpg",
    "/imagenes/galeria4.jpg",
    "/imagenes/galeria5.webp",
    "/imagenes/galeria6.jpg",
    "/imagenes/logo-100.jpg",
    "/imagenes/logo.jpg",
    "/imagenes/poseidon.jpg",
    "/imagenes/thor.jpg",
    "/imagenes/zeus.jpg"
];

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
      caches.open(cacheName).then(function(cache) {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(filesToCache);
      })
    );
  });

  self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== cacheName) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
    );
   
    return self.clients.claim();
  });

  self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  });