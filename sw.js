const cacheName = 'hainan-trip-v8'
const assets = [
  './',
  './index.html',
  './preview.html',
  './preview.css',
  './preview.js',
  './preview-assistant.html',
  './preview-reservation.html',
  './preview-budget.html',
  './preview-places.html',
  './preview-places.css',
  './preview-places.js',
  './preview-subpage.css',
  './manifest.webmanifest',
  './assets/island-illustration-bg.jpeg',
  './assets/sanya-homestay.jpg',
  './assets/wanning-homestay.jpg',
  './assets/gyate-luminescence.ttf',
  './assets/app-icon.svg'
]

self.addEventListener('install', event => {
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)))
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== cacheName).map(key => caches.delete(key)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const copy = response.clone()
        caches.open(cacheName).then(cache => cache.put(event.request, copy))
        return response
      })
      .catch(() => caches.match(event.request))
  )
})
