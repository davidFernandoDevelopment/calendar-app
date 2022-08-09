import { CSSProperties, useState } from 'react';
import { Calendar, EventPropGetter, View, } from 'react-big-calendar';

import { localizer, getMessagesES } from '../../helper';
import { useUIStore, useCalendarStore } from '../../hooks';
import {
  Navbar, CalendarEventBox, FabDelete,
  EventCalendar, CalendarModal, FabAddNew
} from '../';




export const CalendarPage = () => {

  const { openDateModal } = useUIStore();
  const { events, setActiveEvent } = useCalendarStore();

  const [lastView, setLastView] = useState<View>(localStorage.getItem('lastView') as View || 'week');


  const eventStyleGetter: EventPropGetter<EventCalendar> = (event, start, end, isSelected) => {

    const style: CSSProperties = {
      background: '#347CF7',
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
