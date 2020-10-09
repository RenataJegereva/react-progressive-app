var cacheName = 'test-app';
var filesToCache = [
  '/',
  '/index.js',
  '/css/index.scss',
  '/main.js'
];

//run sw, cache all app content
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

//when offline - serve cached content
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});