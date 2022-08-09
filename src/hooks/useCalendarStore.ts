import { useAppSelector } from './';
import { useAppDispatch } from './useRedux';
import { EventCalendar } from '../calendar';
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } from '../store';

export const useCalendarStore = () => {
    const dispatch = useAppDispatch();
    const { events, activeEvent } = useAppSelector(state => state.calendar);

    const setActiveEvent = (event: EventCalendar | null) => {
        dispatch(onSetActiveEvent(event));
    };

    const startSavingEvent = async (calendarEvent: EventCalendar) => {
        if (calendarEvent._id) {
            dispatch(onUpdateEvent({
                ...calendarEvent
            }));
        } else {
            dispatch(onAddNewEvent({
                ...calendarEvent,
                _id: new Date().getTime()
            }));
        }
    };

    const startDeletingEvent = async () => {
        dispatch(onDeleteEvent());
    };

    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent && !!activeEvent._id,
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent
    };
};