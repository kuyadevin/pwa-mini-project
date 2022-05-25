// TODO: Create a service worker that caches static assets:
const { registerRoute } = require("workbox-routing");
const { StaleWhileRevalidate } = require("workbox-strategies");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");
const { CacheResponsePlugin } = require("workbox-cachable-response");
// Adds assets to cache and respond to network requests with these cached assetes
precacheAndRoute(self.__WB_MANIFEST);

//Register route for caching
registerRoute(
  ({ request }) => ["style", "script", "worker"].includes(request.destination),
  new StaleWhileRevalidate({
    //Name of cache storage
    cacheName: "asset-cache",
    plugins: [
      new CacheResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
