var cacheName = "Mis Perris V4";
var filesToCache = [
    "/",
    "/index.html",
    "/registro.html",
    "/galeria.html",
    "/javascript/app.js",
    "/javascript/main.js",
    "/javascript/fecha.js",
    "/javascript/jquery-3.1.1.min.js",
    "/javascript/ValidarCel.js",
    "/javascript/ValidarEmail.js",
    "/javascript/ValidarNom.js",
    "/javascript/validarRUT.js",
    "/style/style.css",
    "/imagenes/1.jpg",
    "/imagenes/2.jpg",
    "/imagenes/3.jpg",
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