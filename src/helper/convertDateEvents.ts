import { parseISO } from 'date-fns';

import { EventCalendar } from '../calendar';
import { EventCalendarResponse } from '../api';

export const convertDateEvents = (
	events: EventCalendarResponse[] = []
): EventCalendar[] => {
	return events.map((event) => ({
		...event,
		start: parseISO(event.start as string),
		end: parseISO(event.end as string),
	}));
};
