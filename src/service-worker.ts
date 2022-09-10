/// <reference lib="webworker" />
import { registerRoute } from 'workbox-routing';
import { clientsClaim, WorkboxPlugin } from 'workbox-core';
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import {
	CacheFirst,
	NetworkOnly,
	NetworkFirst,
	StaleWhileRevalidate,
} from 'workbox-strategies';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';

import {
	addEvent,
	deleteEvent,
	getEvents,
	putEvent,
} from './serviceWorkerEvents';
import { saveEventDataLocally } from './dexieDB/event';

declare const self: ServiceWorkerGlobalScope;
clientsClaim();

//* Cacheamos todos los archivos generados de la compilación.
precacheAndRoute(self.__WB_MANIFEST);

//* Controlo que solo se carge la página index.htmlm dado que es un SPA.
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(({ request, url }) => {
	if (
		request.clone().mode !== 'navigate' ||
		url.pathname.startsWith('/_') ||
		url.pathname.match(fileExtensionRegexp)
	) {
		return false;
	}
	return true;
}, createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html'));

//* App_shell
const cacheFirst = [
	'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css',
	'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css',
];

registerRoute(({ url }) => {
	return cacheFirst.includes(url.href) ? true : false;
}, new CacheFirst());

//* Request dynamics
const networkFirst = ['/api/auth/renew'];
registerRoute(({ url }) => {
	return networkFirst.includes(url.pathname) ? true : false;
}, new NetworkFirst());

registerRoute(
	({ url }) => ['/api/events'].includes(url.pathname),
	async ({ request }) => {
		try {
			console.log('cargas /api/events [GET]....');
			const response = await fetch(request.clone());
			const data = await response.json();
			console.log({ data });
			if (data.ok) {
				//* En cada recarga actualizo la información en indexedDB con la nube.
				await saveEventDataLocally(data.eventos);
				return new Response(JSON.stringify(data));
			} else {
				return getEvents();
			}
		} catch (err) {
			return getEvents();
		}
	}
);

//* Posteos offlines
const bgSyncPlugin = new BackgroundSyncPlugin('posteos-offline', {
	maxRetentionTime: 24 * 60,
});

const postPlugin: WorkboxPlugin = {
	//* requestWillFetch, para el bug de request.clone()
	requestWillFetch: async ({ request }) => {
		return request.clone();
	},
	handlerDidError: async ({ request }) => {
		const dataJSON = await request.clone().json();
		return addEvent(dataJSON);
	},
};

const putPlugin: WorkboxPlugin = {
	//* requestWillFetch, para el bug de request.clone()
	requestWillFetch: async ({ request }) => {
		return request.clone();
	},
	handlerDidError: async ({ request }) => {
		const dataJSON = await request.clone().json();
		return putEvent(dataJSON.id, dataJSON);
	},
};

const deletePlugin: WorkboxPlugin = {
	requestWillFetch: async ({ request }) => {
		return request.clone();
	},
	handlerDidError: async ({ request: { url } }) => {
		let id = url.split('events/')[1];
		return deleteEvent(id);
	},
};

registerRoute(
	new RegExp('https://calendar-app-ts.herokuapp.com/api/events'),
	new NetworkOnly({
		plugins: [postPlugin, bgSyncPlugin],
	}),
	'POST'
);
registerRoute(
	new RegExp('https://calendar-app-ts.herokuapp.com/api/events'),
	new NetworkOnly({
		plugins: [putPlugin, bgSyncPlugin],
	}),
	'PUT'
);
registerRoute(
	new RegExp('https://calendar-app-ts.herokuapp.com/api/events'),
	new NetworkOnly({
		plugins: [deletePlugin, bgSyncPlugin],
	}),
	'DELETE'
);

registerRoute(
	// Add in any other file extensions or routing criteria as needed.
	({ url }) =>
		url.origin === self.location.origin && url.pathname.endsWith('.png'),
	// Customize this strategy as needed, e.g., by changing to CacheFirst.
	new StaleWhileRevalidate({
		cacheName: 'images',
		plugins: [
			// Ensure that once this runtime cache reaches a maximum size the
			// least-recently used images are removed.
			// new ExpirationPlugin({ maxEntries: 50 }),
		],
	})
);

self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') {
		self.skipWaiting();
	}
});
