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
				await calendarApi.put(`events/${calendarEvent.id}`, calendarEvent);
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
			console.log({ id });
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
			Swal.fire('Error al guardar', err.response.data.msg, 'error');
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
			console.log('Error cargando eventos');
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
