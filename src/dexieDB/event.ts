import { ObjectID } from 'bson';

import { db } from './db';
import { EventCalendar } from '../calendar';

export const saveEventDataLocally = (events: EventCalendar[]) => {
	let arrayPromises = events.map((evt) => db.events.put(evt));
	return Promise.all(arrayPromises);
};

export const getEventDataLocally = () => {
	return db.events.toArray();
};

export const addEventDataLocally = (event: EventCalendar) => {
	const id = new ObjectID();

	return db.events.add({
		...event,
		id: event.id || id.toString(),
	});
};

export const updateEventDataLocally = (
	id: string | number,
	event: EventCalendar
) => {
	return db.events.update(id, event);
};
