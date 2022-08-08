import { addHours } from 'date-fns';
import { Calendar } from 'react-big-calendar';

import { Navbar } from '../';
import { localizer, getMessagesES } from '../../helper';




export const CalendarPage = () => {

  const events = [{
    title: 'My cumpleaños',
    notes: 'Comprar torta',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'David'
    }
  }];

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
      />
    </>
  );
};

export default CalendarPage;
