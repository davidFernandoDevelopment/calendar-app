import { CSSProperties, useState, useEffect } from 'react';
import { Calendar, EventPropGetter, View, } from 'react-big-calendar';

import { localizer, getMessagesES } from '../../helper';
import { useUIStore, useCalendarStore, useAuthStore } from '../../hooks';
import {
  Navbar, CalendarEventBox, FabDelete,
  EventCalendar, CalendarModal, FabAddNew
} from '../';




export const CalendarPage = () => {

  const { user } = useAuthStore();
  const { openDateModal } = useUIStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const [lastView, setLastView] = useState<View>(localStorage.getItem('lastView') as View || 'week');

  useEffect(() => {
    startLoadingEvents();
    //eslint-disable-next-line
  }, []);

  const eventStyleGetter: EventPropGetter<EventCalendar> = (event) => {
    const isMyEvent = event.user._id === user?.uid;

    const style: CSSProperties = {
      background: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    };
    return {
      style
    };
  };

  const onDoublClick = (e: EventCalendar) => {
    openDateModal();
  };

  const onSelect = (e: EventCalendar) => {
    setActiveEvent(e);
  };

  const onViewChanged = (e: View) => {
    localStorage.setItem('lastView', e);
    setLastView(e);
  };

  return (
    <>
      <Navbar />
      <Calendar
        culture='es'
        messages={getMessagesES()}

        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}

        defaultView={lastView}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEventBox
        }}
        onView={onViewChanged}
        onSelectEvent={onSelect}
        onDoubleClickEvent={onDoublClick}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};

export default CalendarPage;
