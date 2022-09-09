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

import { ObjectId } from 'bson';

export const useCalendarStore = () => {
	const dispatch = useAppDispatch();
	const { events, activeEvent } = useAppSelector((state) => state.calendar);
	const { user } = useAppSelector((state) => state.auth);

	const setActiveEvent = (event: EventCalendar | null) => {
		dispatch(onSetActiveEvent(event));
	};

	const startSavingEvent = async (calendarEvent: EventCalendar) => {
		try {
			if (calendarEvent.id) {
				const { data } = await calendarApi.put(
					`events/${calendarEvent.id}`,
					calendarEvent
				);
				dispatch(
					onUpdateEvent({
						...calendarEvent,
						user: {
							_id: user?.uid!,
							name: user?.name!,
						},
					})
				);
				return;
			}
			const id_new = new ObjectId().toString(); //* OBJECT_ID PARA MONGO
			const { data } = await calendarApi.post('events', {
				...calendarEvent,
				id: id_new,
			});
			dispatch(
				onAddNewEvent({
					...calendarEvent,
					id: id_new,
					user: {
						_id: user?.uid!,
						name: user?.name!,
					},
				})
			);
		} catch (err: any) {
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
			dispatch(onLoadEvents(events));
		} catch (err) {
			console.log(err);
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
