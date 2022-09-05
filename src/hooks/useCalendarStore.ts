import {
	onSetActiveEvent,
	onAddNewEvent,
	onUpdateEvent,
	onDeleteEvent,
	onLoadEvents,
} from '../store';
import { useAppSelector } from './';
import { calendarApi } from '../api';
import { useAppDispatch } from './useRedux';
import { EventCalendar } from '../calendar';
import { convertDateEvents } from '../helper';
import Swal from 'sweetalert2';

import {
	addEventDataLocally,
	getEventDataLocally,
	saveEventDataLocally,
	updateEventDataLocally,
} from '../dexieDB/event';

export const useCalendarStore = () => {
	const dispatch = useAppDispatch();
	const { events, activeEvent } = useAppSelector((state) => state.calendar);
	const { user } = useAppSelector((state) => state.auth);

	const setActiveEvent = (event: EventCalendar | null) => {
		dispatch(onSetActiveEvent(event));
	};

	const startSavingEvent = async (calendarEvent: EventCalendar) => {
		const data = { ...calendarEvent };
		console.log({ data, calendarEvent });
		try {
			if (calendarEvent.id) {
				await calendarApi.put(`events/${calendarEvent.id}`, calendarEvent);
				await updateEventDataLocally(calendarEvent.id, data);
				dispatch(
					onUpdateEvent({
						...calendarEvent,
						user: {
							name: user?.name!,
							_id: user?.uid!,
						},
					})
				);
				return;
			}
			const {
				data: {
					evento: { id },
				},
			} = await calendarApi.post('events', calendarEvent);
			// await addEventDataLocally({ ...data, id });
			dispatch(
				onAddNewEvent({
					...calendarEvent,
					id,
					user: {
						_id: user?.uid!,
						name: user?.name!,
					},
				})
			);
		} catch (err: any) {
			if (calendarEvent.id) {
				await updateEventDataLocally(calendarEvent.id, data);
				dispatch(
					onUpdateEvent({
						...calendarEvent,
						user: {
							name: user?.name!,
							_id: user?.uid!,
						},
					})
				);
			} else {
				const id = await addEventDataLocally(data);
				dispatch(
					onAddNewEvent({
						...calendarEvent,
						id: id.toString(),
						user: {
							_id: user?.uid!,
							name: user?.name!,
						},
					})
				);
			}
			// Swal.fire('Error al guardar', err, 'error');
			console.log(err);
		}
	};

	const startDeletingEvent = async () => {
		try {
			await calendarApi.delete(`events/${activeEvent?.id}`);
			dispatch(onDeleteEvent());
		} catch (err: any) {
			Swal.fire('Error al eliminar', err.response.data.msg, 'error');
		}
	};

	const startLoadingEvents = async () => {
		try {
			const {
				data: { eventos },
			} = await calendarApi.get('events');

			const events = convertDateEvents(eventos);
			//* EN CADA CARGA ACTUALIZO EL INDEXED-DB.
			await saveEventDataLocally(events);

			dispatch(onLoadEvents(events));
		} catch (err) {
			//* SI NO HAY CONEXIÓN CONSULTO CON EL INDEXED-DB.
			const events = await getEventDataLocally();
			console.log({ events });

			dispatch(onLoadEvents(events));
		}
	};

	return {
		events,
		activeEvent,
		hasEventSelected: !!activeEvent && !!activeEvent.id,
		setActiveEvent,
		startSavingEvent,
		startDeletingEvent,
		startLoadingEvents,
	};
};
