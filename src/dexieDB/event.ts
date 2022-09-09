import { db } from './db';
import { EventCalendar } from '../calendar';

export const saveEventDataLocally = (events: EventCalendar[]) => {
	let arrayPromises = events.map((evt) => db.events.put(evt));
	return Promise.all(arrayPromises);
};

export const getEventDataLocally = () => {
	return db.events.toArray();
};

export const getOneEventDataLocally = (id: string | number) => {
	return db.events.get(id);
};

export const addEventDataLocally = (event: EventCalendar) => {
	return db.events.add({
		...event,
		id: event.id,
	});
};

export const updateEventDataLocally = (
	id: string | number,
	event: EventCalendar
) => {
	return db.events.update(id, event);
};

export const deleteEventDataLocally = (id: string | number) => {
	return db.events.delete(id);
};
