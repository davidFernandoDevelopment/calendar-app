import { addHours } from 'date-fns';
import { CSSProperties, useState } from 'react';
import { Calendar, EventPropGetter, View, } from 'react-big-calendar';

import { Navbar, CalendarEventBox, EventCalendar, CalendarModal } from '../';
import { localizer, getMessagesES } from '../../helper';




export const CalendarPage = () => {

  const [lastView, setLastView] = useState<View>(localStorage.getItem('lastView') as View || 'week');

  const events: EventCalendar[] = [{
    title: 'My cumpleaños',
    start: new Date(),
    end: addHours(new Date(), 2),

    bgColor: 'red',
    notes: 'Comprar torta',
    user: {
      _id: '123',
      name: 'David'
    }
  }];

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
  };

  const onSelect = (e: EventCalendar) => {
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
    </>
  );
};

export default CalendarPage;
