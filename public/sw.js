
const CACHE_NAME = 'skilltime-v2';
const STATIC_CACHE = 'skilltime-static-v2';
const DYNAMIC_CACHE = 'skilltime-dynamic-v2';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/offline'
];

// Cache API responses and dynamic content
const CACHE_STRATEGIES = {
  api: 'network-first',
  images: 'cache-first',
  pages: 'network-first'
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => cache.addAll(STATIC_ASSETS)),
      caches.open(DYNAMIC_CACHE).then(() => console.log('Dynamic cache ready'))
    ]).then(() => {
      console.log('Service worker installed successfully');
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service worker activated');
      return self.clients.claim();
    })
  );
});

// Fetch event - handle requests with caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests and chrome-extension requests
  if (!url.origin.includes(self.location.origin) || url.protocol === 'chrome-extension:') {
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // Handle API requests with network-first strategy
      if (url.pathname.startsWith('/api/')) {
        return fetch(request)
          .then((response) => {
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(DYNAMIC_CACHE).then(cache => {
                cache.put(request, responseClone);
              });
            }
            return response;
          })
          .catch(() => {
            return cachedResponse || new Response(
              JSON.stringify({ error: 'Offline - data not available' }),
              { headers: { 'Content-Type': 'application/json' } }
            );
          });
      }

      // Handle image requests with cache-first strategy
      if (request.destination === 'image') {
        return cachedResponse || fetch(request)
          .then((response) => {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
            return response;
          })
          .catch(() => {
            // Return a placeholder image or empty response
            return new Response();
          });
      }

      // Handle page requests with network-first strategy
      if (request.mode === 'navigate') {
        return fetch(request)
          .then((response) => {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
            return response;
          })
          .catch(() => {
            return cachedResponse || caches.match('/offline');
          });
      }

      // Default: return cached version or fetch from network
      return cachedResponse || fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return response;
        });
    })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle any queued offline actions
      console.log('Background sync triggered')
    );
  }
});

// Push notifications support
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-192x192.png'
      })
    );
  }
});
