import { EventProps } from 'react-big-calendar';

import { EventCalendar } from '../interfaces';

interface Props extends EventProps<EventCalendar> { }

export const CalendarEventBox = ({ event: { user, title }, }: Props) => {

    return (
        <>
            <strong>{title}</strong>
            <span> - {user.name}</span>
        </>
    );
};

export default CalendarEventBox;