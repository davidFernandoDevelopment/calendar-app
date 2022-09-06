importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

workbox.loadModule('workbox-background-sync');
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);


const {
    CacheFirst,
    NetworkOnly,
    NetworkFirst,
} = workbox.strategies;
const { registerRoute } = workbox.routing;
const { BackgroundSyncPlugin, Queue } = workbox.backgroundSync;

//* App_shell
const cacheFirst = [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css',
];
registerRoute(
    ({ request, url }) => {
        return cacheFirst.includes(url.href)
            ? true
            : false;
    },
    new CacheFirst()
);

//* Request dynamics
const networkFirst = [
    '/api/events',
    '/api/auth/renew',
];
registerRoute(
    ({ request, url }) => {
        return networkFirst.includes(url.pathname)
            ? true
            : false;
    },
    new NetworkFirst()
);

//* Posteos offlines
const queue = new Queue('put-offline');
const bgSyncPlugin = new BackgroundSyncPlugin('posteos-offline', {
    maxRetentionTime: 24 * 60
});
const myPlugin = {
    fetchDidFail: async ({ originalRequest, request, error, event, state }) => {
        console.log({ request });
    },
    fetchDidSucceed: async ({ originalRequest, request, error, event, state }) => {
        console.log({ response });
    },
}

registerRoute(
    new RegExp('https://calendar-app-ts.herokuapp.com/api/events'),
    new NetworkOnly({
        cacheName: 'post',
        plugins: [bgSyncPlugin]
    }),
    'POST'
)
registerRoute(
    new RegExp('https://calendar-app-ts.herokuapp.com/api/events'),
    new NetworkOnly({
        cacheName: 'put',
        plugins: [myPlugin, bgSyncPlugin]
    }),
    'PUT'
)
registerRoute(
    new RegExp('https://calendar-app-ts.herokuapp.com/api/events'),
    new NetworkOnly({
        plugins: [bgSyncPlugin]
    }),
    'DELETE'
);