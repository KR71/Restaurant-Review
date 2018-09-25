if('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/serviceWorker.js')
        .then(function() { console.log("Service Worker Registered"); });
}


self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('restaurant-review').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/restaurant.html',
                '/css/styles.css',
                '/js/main.js',
                '/js/restaurant_info.js'

            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    console.log(event.request.url);

    event.respondWith(
        caches.match(event.request.url).then(function(response) {
            return response || fetch(event.request);
        })
    );
});