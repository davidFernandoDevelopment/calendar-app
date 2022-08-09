import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EventCalendar } from '../../calendar';


import { addHours } from 'date-fns';
const tempEvent: EventCalendar = {
    _id: '123',
    title: 'My cumpleaños',
    start: new Date(),
    end: addHours(new Date(), 2),

    bgColor: 'red',
    notes: 'Comprar torta',
    user: {
        _id: '123',
        name: 'David'
    }
};

interface CalendarState {
    events: EventCalendar[];
    activeEvent: EventCalendar | null;
}

const initialState: CalendarState = {
    events: [tempEvent],
    activeEvent: null
};

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        onSetActiveEvent: (state: CalendarState, action: PayloadAction<EventCalendar | null>) => {
            state.activeEvent = action.payload;
        },
        onAddNewEvent: (state: CalendarState, action: PayloadAction<EventCalendar>) => {
            state.events.push(action.payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state: CalendarState, action: PayloadAction<EventCalendar>) => {
            state.events = state.events.map(evt => {
                if (evt._id === action.payload._id) return action.payload;
                return evt;
            });
        },
        onDeleteEvent: (state: CalendarState) => {
            if (state.activeEvent) {
                state.events = state.events.filter(evt => evt._id !== state.activeEvent?._id);
                state.activeEvent = null;
            }
        }
    }
});


export const {
    onAddNewEvent,
    onUpdateEvent,
    onDeleteEvent,
    onSetActiveEvent
} = calendarSlice.actions;
export default calendarSlice.reducer;