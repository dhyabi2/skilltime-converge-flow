
const CACHE_NAME = 'skilltime-v3';
const STATIC_CACHE = 'skilltime-static-v3';
const DYNAMIC_CACHE = 'skilltime-dynamic-v3';
const API_CACHE = 'skilltime-api-v3';

// Enhanced assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/home',
  '/browse',
  '/profile',
  '/bookings',
  '/notifications',
  '/auth',
  '/offline',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// API endpoints to cache
const API_ENDPOINTS = [
  '/api/skills',
  '/api/categories',
  '/api/profiles'
];

// Cache strategies
const CACHE_STRATEGIES = {
  api: 'network-first',
  images: 'cache-first',
  pages: 'network-first',
  static: 'cache-first'
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => {
        console.log('Caching static assets...');
        return cache.addAll(STATIC_ASSETS);
      }),
      caches.open(DYNAMIC_CACHE).then(() => {
        console.log('Dynamic cache ready');
      }),
      caches.open(API_CACHE).then(() => {
        console.log('API cache ready');
      })
    ]).then(() => {
      console.log('Service worker installed successfully');
      return self.skipWaiting();
    }).catch(error => {
      console.error('Service worker installation failed:', error);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheName.includes('skilltime-v3')) {
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

// Enhanced fetch event handler
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and external URLs
  if (request.method !== 'GET' || !url.origin.includes(self.location.origin)) {
    return;
  }

  // Skip Chrome extension requests
  if (url.protocol === 'chrome-extension:') {
    return;
  }

  event.respondWith(handleRequest(request, url));
});

async function handleRequest(request, url) {
  try {
    // Handle API requests with network-first strategy
    if (url.pathname.startsWith('/api/') || url.hostname.includes('supabase')) {
      return await networkFirstStrategy(request, API_CACHE);
    }

    // Handle image requests with cache-first strategy
    if (request.destination === 'image' || url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) {
      return await cacheFirstStrategy(request, DYNAMIC_CACHE);
    }

    // Handle font requests with cache-first strategy
    if (request.destination === 'font' || url.pathname.match(/\.(woff|woff2|ttf|eot)$/)) {
      return await cacheFirstStrategy(request, STATIC_CACHE);
    }

    // Handle navigation requests (pages)
    if (request.mode === 'navigate') {
      return await networkFirstStrategy(request, DYNAMIC_CACHE, '/offline');
    }

    // Handle static assets with cache-first strategy
    if (url.pathname.match(/\.(js|css|json)$/)) {
      return await cacheFirstStrategy(request, STATIC_CACHE);
    }

    // Default to network-first for everything else
    return await networkFirstStrategy(request, DYNAMIC_CACHE);

  } catch (error) {
    console.error('Request handling failed:', error);
    
    // Return cached version or offline page for navigation
    if (request.mode === 'navigate') {
      const offlineResponse = await caches.match('/offline');
      return offlineResponse || new Response('Offline', { status: 200 });
    }
    
    return new Response('Network error', { status: 503 });
  }
}

// Network-first strategy
async function networkFirstStrategy(request, cacheName, fallbackUrl = null) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache:', request.url);
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return fallback for navigation requests
    if (fallbackUrl && request.mode === 'navigate') {
      const fallbackResponse = await caches.match(fallbackUrl);
      if (fallbackResponse) {
        return fallbackResponse;
      }
    }
    
    throw error;
  }
}

// Cache-first strategy
async function cacheFirstStrategy(request, cacheName) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Network and cache failed for:', request.url);
    throw error;
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(handleBackgroundSync());
  }
});

async function handleBackgroundSync() {
  console.log('Handling background sync...');
  // Handle any queued offline actions here
  // This could include form submissions, bookings, etc.
}

// Enhanced push notifications
self.addEventListener('push', (event) => {
  console.log('Push message received');
  
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-192x192.png',
      image: data.image,
      data: data.data,
      actions: data.actions || [
        {
          action: 'view',
          title: 'View',
          icon: '/icons/icon-192x192.png'
        },
        {
          action: 'dismiss',
          title: 'Dismiss'
        }
      ],
      requireInteraction: data.requireInteraction || false,
      silent: data.silent || false,
      timestamp: Date.now()
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event.notification.data);
  
  event.notification.close();
  
  const data = event.notification.data;
  const action = event.action;
  
  if (action === 'dismiss') {
    return;
  }
  
  // Handle notification click
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      // Check if app is already open
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.focus();
          
          if (data && data.url) {
            client.navigate(data.url);
          }
          
          return;
        }
      }
      
      // Open new window if app is not open
      if (clients.openWindow) {
        const url = data && data.url ? data.url : '/';
        return clients.openWindow(url);
      }
    })
  );
});

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Periodic background sync for updates
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'content-sync') {
    event.waitUntil(syncContent());
  }
});

async function syncContent() {
  console.log('Syncing content in background...');
  // Sync critical content when the user is offline
}

console.log('Service Worker: Script loaded');
