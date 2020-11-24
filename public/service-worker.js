var myCache = 'myCache'

self.addEventListener("install", event => {
    console.log('Service Worker installé');

    //Mettre en cache les ressources statiques (les assets : html, css, js, fonts,...) du site.
    event.waitUntil(
        caches.open(myCache).then(function (cache) {
            return cache.addAll(
                [
                    '/',
                    '/index.html'
                ]
            );
        })
    );
});


//Cache first
self.addEventListener('fetch', function (event) {
    event.respondWith(

        // Cache les ressources asynchroness
        caches.open(myCache).then(function (cache) {
            return cache.match(event.request).then(function (response) {
                return (
                    response ||
                    fetch(event.request).then(function (response) {
                        cache.put(event.request, response.clone());
                        return response;
                    })
                );
            });
        }),


    );
});