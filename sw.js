// Service Worker for Weather TPHCM PWA
const CACHE_NAME = 'weather-tphcm-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  console.log('Service Worker: Install event');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: All files cached');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activate event');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Claiming clients');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  console.log('Service Worker: Fetch event for', event.request.url);
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Handle API requests differently
  if (event.request.url.includes('openweathermap.org')) {
    event.respondWith(
      // Network first for API calls
      fetch(event.request)
        .then((response) => {
          // Clone the response
          const responseClone = response.clone();
          
          // Cache successful API responses
          if (response.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          
          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(event.request);
        })
    );
    return;
  }

  // Cache first strategy for static resources
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          console.log('Service Worker: Serving from cache', event.request.url);
          return response;
        }
        
        console.log('Service Worker: Fetching from network', event.request.url);
        return fetch(event.request).then((response) => {
          // Don't cache if not successful
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Add to cache
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        // Return offline page for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      })
  );
});

// Background sync for updating weather data
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync', event.tag);
  
  if (event.tag === 'weather-sync') {
    event.waitUntil(
      // Perform background sync
      fetch('/api/weather')
        .then((response) => response.json())
        .then((data) => {
          // Update cache with new data
          return caches.open(CACHE_NAME).then((cache) => {
            return cache.put('/api/weather', new Response(JSON.stringify(data)));
          });
        })
        .catch((error) => {
          console.log('Background sync failed:', error);
        })
    );
  }
});

// Push notification event
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push event received');
  
  const options = {
    body: event.data ? event.data.text() : 'Cập nhật thời tiết mới',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    tag: 'weather-update',
    renotify: true,
    actions: [
      {
        action: 'view',
        title: 'Xem chi tiết',
        icon: '/icons/view.png'
      },
      {
        action: 'dismiss',
        title: 'Đóng',
        icon: '/icons/close.png'
      }
    ],
    data: {
      url: '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification('Weather TPHCM', options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification click event');
  
  event.notification.close();

  if (event.action === 'view') {
    // Open the app
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});

// Message event for communication with main thread
self.addEventListener('message', (event) => {
  console.log('Service Worker: Message received', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_UPDATE') {
    // Force cache update
    caches.delete(CACHE_NAME).then(() => {
      return caches.open(CACHE_NAME);
    }).then((cache) => {
      return cache.addAll(urlsToCache);
    });
  }
});

// Periodic background sync (if supported)
self.addEventListener('periodicsync', (event) => {
  console.log('Service Worker: Periodic sync event', event.tag);
  
  if (event.tag === 'weather-periodic-sync') {
    event.waitUntil(
      // Update weather data periodically
      updateWeatherData()
    );
  }
});

// Helper function to update weather data
async function updateWeatherData() {
  try {
    const response = await fetch('/api/weather');
    const data = await response.json();
    
    const cache = await caches.open(CACHE_NAME);
    await cache.put('/api/weather', new Response(JSON.stringify(data)));
    
    console.log('Weather data updated in background');
  } catch (error) {
    console.error('Failed to update weather data:', error);
  }
}

// Error handling
self.addEventListener('error', (event) => {
  console.error('Service Worker: Error', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('Service Worker: Unhandled promise rejection', event.reason);
});