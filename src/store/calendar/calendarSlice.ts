import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EventCalendar } from '../../calendar';

interface CalendarState {
	isLoadingEvents: boolean;
	events: EventCalendar[];
	activeEvent: EventCalendar | null;
}

const initialState: CalendarState = {
	events: [],
	activeEvent: null,
	isLoadingEvents: true,
};

export const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		onLoadEvents: (
			state: CalendarState,
			{ payload = [] }: PayloadAction<EventCalendar[]>
		) => {
			state.isLoadingEvents = false;
			payload.forEach((evt) => {
				const exists = state.events.some((dbEvents) => dbEvents.id === evt.id);

				if (!exists) {
					state.events.push(evt);
				}
			});
		},
		onSetActiveEvent: (
			state: CalendarState,
			action: PayloadAction<EventCalendar | null>
		) => {
			state.activeEvent = action.payload;
		},
		onAddNewEvent: (
			state: CalendarState,
			action: PayloadAction<EventCalendar>
		) => {
			state.events.push(action.payload);
			state.activeEvent = null;
		},
		onUpdateEvent: (
			state: CalendarState,
			action: PayloadAction<EventCalendar>
		) => {
			state.events = state.events.map((evt) => {
				if (evt.id === action.payload.id) return action.payload;
				return evt;
			});
		},
		onDeleteEvent: (state: CalendarState) => {
			if (state.activeEvent) {
				state.events = state.events.filter(
					(evt) => evt.id !== state.activeEvent?.id
				);
				state.activeEvent = null;
			}
		},
		onResetCalendar: (state: CalendarState) => {
			state.events = [];
			state.activeEvent = null;
			state.isLoadingEvents = true;
		},
	},
});

export const {
	onLoadEvents,
	onAddNewEvent,
	onUpdateEvent,
	onDeleteEvent,
	onResetCalendar,
	onSetActiveEvent,
} = calendarSlice.actions;
export default calendarSlice.reducer;
