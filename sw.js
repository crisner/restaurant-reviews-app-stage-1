// Files to be cached
const cacheFiles = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/img/1__480_360.jpg',
    '/img/2__480_360.jpg',
    '/img/3__480_360.jpg',
    '/img/4__480_360.jpg',
    '/img/5__480_360.jpg',
    '/img/6__480_360.jpg',
    '/img/7__480_360.jpg',
    '/img/8__480_360.jpg',
    '/img/9__480_360.jpg',
    '/img/10__480_360.jpg'
];

// Install ServiceWorker and add to cache
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll(cacheFiles);
        })
    );
});

// Fetch from network if a match is not found in cache
self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request).then(function(response) {
                let responseClone = response.clone();
                caches.open('v1').then(function(cache) {
                    cache.put(e.request, responseClone);
                });
                return response;
            });
        }).catch(function(error) {
            console.log('Unavailable ', error);
        })
    );
})