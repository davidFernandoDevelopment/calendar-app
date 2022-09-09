import {
	addEventDataLocally,
	deleteEventDataLocally,
	getEventDataLocally,
	getOneEventDataLocally,
	updateEventDataLocally,
} from './dexieDB/event';
import { EventCalendar } from './calendar/interfaces';

export const getEvents = async () => {
	//* OBTENER EVENTOS DEL INDEXED-DB
	const eventos = await getEventDataLocally();
	const response = {
		eventos,
		ok: true,
	};

	return new Response(JSON.stringify(response));
};

export const addEvent = async (event: EventCalendar) => {
	await addEventDataLocally(event);

	const newResponse = {
		ok: true,
		evento: event,
	};
	return new Response(JSON.stringify(newResponse));
};

export const putEvent = async (id: number | string, event: EventCalendar) => {
	await updateEventDataLocally(id, event);

	const newResponse = {
		ok: true,
		evento: event,
	};
	return new Response(JSON.stringify(newResponse));
};

export const deleteEvent = async (id: string | number) => {
	let response: Response;
	const evento = await getOneEventDataLocally(id);

	if (evento) {
		await deleteEventDataLocally(id);
		response = new Response(
			JSON.stringify({
				ok: true,
				evento,
			})
		);
	} else {
		response = new Response(
			JSON.stringify({
				ok: false,
				msg: 'No existe el evento',
			})
		);
	}

	return response;
};
